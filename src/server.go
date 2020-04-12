package main

import (
	"encoding/csv"
	"fmt"
	"io"
	"net/http"
	"os"

	"github.com/ishunyu/magpie-dict/parser"
)

var fileCSV = "/Users/shun/code/magpie-dict/resource/data/EP21Outfile.csv"

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

func data() {
	csvfile, _ := os.Open(fileCSV)
	data := csv.NewReader(csvfile)

	for {
		record, err := data.Read()
		if err == io.EOF {
			break
		}
		fmt.Printf("%s\n", record)
	}
}

func main() {
	// http.HandleFunc("/hello", hello)
	// http.HandleFunc("/parse", parse)

	// port := 8090
	// fmt.Printf("Starting server on port %v...", port)
	// http.ListenAndServe(fmt.Sprint(":", port), nil)

	data()
}
