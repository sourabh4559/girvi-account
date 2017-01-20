package main

import (
	"html/template"
	"log"
	"net/http"
	"path"
)

func fileHandler(rw http.ResponseWriter, req *http.Request) {
	if req.URL.Path == "/" {
		template, _ := template.ParseFiles(path.Join("static", "index.html"))
		if template != nil {
			template.Execute(rw, nil)
		}
	} else {
		http.ServeFile(rw, req, path.Join("static", req.URL.Path[1:]))
	}
}

func main() {
	http.HandleFunc("/", fileHandler)
	err := http.ListenAndServe(":3000", nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
