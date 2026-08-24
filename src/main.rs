#[macro_use] extern crate rocket;

use rocket::form::{Form, FromForm};
use rocket::http::{Cookie, CookieJar};
use rocket::response::Redirect;
use rocket_dyn_templates::{Template, context};
use serde::{Deserialize, Serialize};
use std::fs;
mod admin;

#[derive(Serialize, Deserialize, Debug, Clone)]
struct Project {
    id: String,
    name: String,
    description: String,
    category: String,
    detailed_description: String,
    technologies: Vec<String>,
    date: String,
    github: String,
}

pub fn load_projects() -> Vec<Project> {
    let data = fs::read_to_string("static/projects.json")
        .expect("Impossible de lire projects.json");
    serde_json::from_str(&data)
        .expect("Erreur de parsing JSON")
}

#[get("/")]
fn home() -> Template {
    let projects = load_projects();
    Template::render("index", context! {
        title: "Portfolio",
        username: "Omar",
        projects: projects,
    })
}

#[get("/project/<project_id>")]
fn project_detail(project_id: &str) -> Result<Template, rocket::response::status::NotFound<String>> {
    let projects = load_projects();
    if let Some(project) = projects.iter().find(|p| p.id == project_id) {
        Ok(Template::render("project", context! {
            title: format!("{} - Détails", project.name),
            username: "Omar",
            project: project,
        }))
    } else {
        Err(rocket::response::status::NotFound("Projet non trouvé".to_string()))
    }
}

#[launch]
fn rocket() -> _ {
    rocket::build()
        .mount("/", routes![home, project_detail])
        .mount("/admin", routes![admin::login, admin::admin_login, admin::dashboard, admin::admin_new_project, admin::admin_create_project, admin::admin_delete_project, admin::admin_update_project, admin::admin_edit_project])
        .mount("/static", rocket::fs::FileServer::from("static"))
        .attach(Template::fairing())
}