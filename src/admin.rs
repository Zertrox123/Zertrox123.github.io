use rocket_dyn_templates::{Template, context};
use rocket::form::Form;
use rocket::http::{Cookie, CookieJar};
use rocket::response::Redirect;
use rocket::request::{self, Request, FromRequest};
use serde::{Deserialize, Serialize};
use sha2::{Sha256, Sha512, Digest};
use std::fs;

use crate::Project;

#[derive(FromForm)]
struct LoginForm {
    username: String,
    password: String,
}

#[derive(FromForm)]
struct ProjectForm   {
    id: String,
    name: String,
    description: String,
    category: String,
    detailed_description: String,
    technologies: String,
    date: String,
    github: String,
}

static user: &str = "admin";
static pass: &str = "password123";

fn is_loggin_safe(cookies: &CookieJar<'_>) -> bool {

    let mut hasher = Sha256::new();
    let value = format!("{}:{}", user, pass);
    hasher.update(value);
    match cookies.get("admin") {
        Some(cookie) => {
            let value = cookie.value().to_string();
            return value == format!("{:x}",hasher.finalize());
        }
        _ => {
            return false;
        }
    }
}

#[get("/login")]
pub fn login() -> Template {
    Template::render("admin_login", context! {})
}

#[post("/login", data = "<form>")]
pub fn admin_login(form: Form<LoginForm>, cookies: &CookieJar<'_>) -> Result<Redirect, Template> {
    let mut hasher = Sha256::new();
    //println!("{}\n{}\n{}\n{}", form.username, user, form.password, pass);
    if form.username == user && form.password == pass {
        let value = format!("{}:{}", form.username, form.password);
        hasher.update(value);
        cookies.add(("admin", format!("{:x}", hasher.finalize())));
        Ok(Redirect::to("/admin/dashboard"))
    } else {
        Err(Template::render("admin_login", context! {
            title: "Admin Login",
            error: "Identifiants incorrects",
        }))
    }
}

#[get("/dashboard")]
pub fn dashboard(cookies: &CookieJar<'_>) -> Result<Template, rocket::response::status::NotFound<String>> {
    if !is_loggin_safe(cookies) {
        return Ok(Template::render("admin_login", context! {}));
    }
    let projects = crate::load_projects();
    Ok(Template::render("admin_dashboard", context! {
        title: "Dashboard",
        projects,
    }))
}

fn save_projects(projects: &Vec<Project>) -> Result<(), Box<dyn std::error::Error>> {
    let json = serde_json::to_string_pretty(projects)?;
    fs::write("static/projects.json", json)?;
    Ok(())
}

#[get("/project/new")]
pub fn admin_new_project(cookies: &CookieJar<'_>) -> Template {
    if !is_loggin_safe(cookies) {
        return Template::render("admin_login", context! {});
    }
    Template::render("admin_project", context! {
        title: "Nouveau Projet",
        action: "/admin/project/create",
    })
}

fn load_projects() -> Vec<Project> {
    let data = fs::read_to_string("static/projects.json")
        .unwrap_or_else(|_| "[]".to_string());
    serde_json::from_str(&data)
        .unwrap_or_else(|_| Vec::new())
}

#[post("/project/create", data = "<form>")]
pub fn admin_create_project(cookies: &CookieJar<'_>, form: Form<ProjectForm>) -> Result<Redirect, String> {
    if !is_loggin_safe(cookies) {
        return Ok(Redirect::to("/admin/login"));
    }
    let mut projects = load_projects();
    if projects.iter().any(|p| p.id == form.id) {
        return Err("Un projet avec cet ID existe déjà".to_string());
    }
    println!("{}\n{}\n{}\n{}\n{}\n", form.id, form.name, form.description, form.technologies, form.date);
    let new_project = Project {
        id: form.id.clone(),
        name: form.name.clone(),
        description: form.description.clone(),
        category: form.category.clone(),
        detailed_description: form.detailed_description.clone(),
        technologies: form.technologies
            .split(',')
            .map(|s| s.trim().to_string())
            .filter(|s| !s.is_empty())
            .collect(),
        date: form.date.clone(),
        github: form.github.clone(),
    };
    projects.push(new_project);
    match save_projects(&projects) {
        Ok(_) => Ok(Redirect::to("/admin/dashboard")),
        Err(e) => Err(format!("Erreur lors de la sauvegarde: {}", e)),
    }
}

#[post("/project/<project_id>/delete")]
pub fn admin_delete_project(cookies: &CookieJar<'_>, project_id: &str) -> Result<Redirect, String> {
    if !is_loggin_safe(cookies) {
        return Ok(Redirect::to("/admin/login"));
    }
    let mut projects = load_projects();
    if let Some(pos) = projects.iter().position(|p| p.id == project_id) {
        projects.remove(pos);
        match save_projects(&projects) {
            Ok(_) => Ok(Redirect::to("/admin/dashboard")),
            Err(e) => Err(format!("Erreur lors de la sauvegarde: {}", e)),
        }
    } else {
        Err("Projet non trouvé".to_string())
    }
}

#[post("/project/<project_id>/update", data = "<form>")]
pub fn admin_update_project(cookies: &CookieJar<'_>, project_id: &str, form: Form<ProjectForm>) -> Result<Redirect, String> {
    if !is_loggin_safe(cookies) {
        return Ok(Redirect::to("/admin/login"));
    }
    let mut projects = load_projects();
    if let Some(project) = projects.iter_mut().find(|p| p.id == project_id) {
        project.name = form.name.clone();
        project.description = form.description.clone();
        project.category = form.category.clone();
        project.detailed_description = form.detailed_description.clone();
        project.technologies = form.technologies
            .split(',')
            .map(|s| s.trim().to_string())
            .filter(|s| !s.is_empty())
            .collect();
        project.date = form.date.clone();
        project.github = form.github.clone();
        match save_projects(&projects) {
            Ok(_) => Ok(Redirect::to("/admin/dashboard")),
            Err(e) => Err(format!("Erreur lors de la sauvegarde: {}", e)),
        }
    } else {
        Err("Projet non trouvé".to_string())
    }
}

#[get("/project/<project_id>/edit")]
pub fn admin_edit_project(cookies: &CookieJar<'_>, project_id: &str) -> Result<Template, rocket::response::status::NotFound<String>> {
    if !is_loggin_safe(cookies) {
        return Ok(Template::render("admin_login", context! {}));
    }
    let projects = load_projects();
    if let Some(project) = projects.iter().find(|p| p.id == project_id) {
        Ok(Template::render("admin_update", context! {
            title: format!("Éditer {}", project.name),
            project: project,
            action: format!("/admin/project/{}/update", project_id),
            button_text: "Mettre à jour",
            technologies_str: project.technologies.join(", "),
        }))
    } else {
        Err(rocket::response::status::NotFound("Projet non trouvé".to_string()))
    }
}
