package main

import (
	"fmt"
	"net/http"

	"github.com/ishunyu/magpie-dict/parser"
)

var fileA = "C:\\Users\\Shun\\Documents\\code\\magpie-dict\\resource\\subtitles\\ep21 - a.sbv"

// var fileB = "C:\\Users\\Shun\\Documents\\code\\magpie-dict\\resource\\subtitles\\ep21 - a.sbv"

func hello(w http.ResponseWriter, req *http.Request) {
	fmt.Fprint(w, "Hello World!")
}

func parse(w http.ResponseWriter, req *http.Request) {
	res, _ := parser.ParseSBV(fileA)
	fmt.Fprintln(w, res)
}

func parsee() {
	f, _ := parser.ParseSBV(fileA)
	fmt.Println(f)
}

func main() {
	// http.HandleFunc("/hello", hello)
	// http.HandleFunc("/parse", parse)

	// port := 8090
	// fmt.Printf("Starting server on port %v...", port)
	// http.ListenAndServe(fmt.Sprint(":", port), nil)

	parsee()
}
