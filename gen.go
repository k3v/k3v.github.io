package main

import (
	"html/template"
	"log"
	"os"
)

type TemplateData struct {
	Active string
}

func main() {
	tmpl, err := template.ParseFiles("gen/templates/index.tmpl")
	if err != nil {
		log.Fatal(err)
	}

	gens := map[string]string{
		"none":      "index.html",
		"greetings": "greet/index.html",
		"thoughts":  "thoughts/index.html",
		"notes":     "notes/index.html",
		"projects":  "projects/index.html",
	}

	for key, path := range gens {
		os.Remove(path)
		f, err := os.Create(path)
		if err != nil {
			log.Fatal(err)
		}

		data := TemplateData{Active: key}
		err = tmpl.Execute(f, data)
		if err != nil {
			log.Fatal(err)
		}

		f.Close()
	}
}
