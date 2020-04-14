package main

import (
	"encoding/csv"
	"fmt"
	"net/http"
	"os"
	"strconv"

	"github.com/blevesearch/bleve"
	"github.com/blevesearch/bleve/mapping"
	"github.com/ishunyu/magpie-dict/parser"
)

var fileCSV = "/Users/shun/code/magpie-dict/resource/data/EP21Outfile.csv"
var fileIndex = "/Users/shun/code/magpie-dict/tmp/index.bleve"

func parse(w http.ResponseWriter, req *http.Request) {
	res, _ := parser.ParseSBV(fileA)
	fmt.Fprintln(w, res)
}

func searchHandler(w http.ResponseWriter, req *http.Request) {
	fmt.Fprint(w, "Hello World!")
}

func data() *[][]string {
	csvfile, _ := os.Open(fileCSV)
	data := csv.NewReader(csvfile)

	records, _ := data.ReadAll()
	indexedRecords := make([][]string, len(records))
	for i, r := range records {
		newRecord := make([]string, 1, len(r))
		newRecord[0] = strconv.Itoa(i)
		newRecord = append(newRecord, r...)

		indexedRecords[i] = newRecord
	}
	return &indexedRecords
}

type Record struct {
	Index  string
	AStart string
	AEnd   string
	AText  string
	BStart string
	BEnd   string
	BText  string
}

func indexRecords(records *[][]string) *bleve.Index {
	index, err := bleve.Open(fileIndex)
	if err == nil {
		return &index
	}

	mapping := indexMapping()
	index, err = bleve.New(fileIndex, mapping)
	if err != nil {
		panic(err)
	}

	for _, r := range *records {
		message := Record{r[0], r[1], r[2], r[3], r[4], r[5], r[6]}
		fmt.Println(message)
		index.Index(message.Index, message)
	}
	return &index
}

func indexMapping() *mapping.IndexMappingImpl {
	mapping := bleve.NewIndexMapping()
	return mapping
}

func search(index *bleve.Index, s *string) *[]string {
	query := bleve.NewQueryStringQuery(*s)
	searchRequest := bleve.NewSearchRequest(query)
	searchResult, _ := (*index).Search(searchRequest)

	// fmt.Printf("searchResult: %s", searchResult)

	hits := len(searchResult.Hits)
	if hits == 0 {
		return nil
	}

	result := make([]string, hits)
	for i, match := range searchResult.Hits {
		result[i] = (*match).ID
	}
	return &result
}

var searchTerm = "鹧鸪"

func main() {
	// http.HandleFunc("/hello", hello)
	// http.HandleFunc("/parse", parse)

	records := data()
	indexRecords(records)

	http.Handle("/", http.FileServer(http.Dir("/Users/shun/code/magpie-dict/static")))
	http.HandleFunc("/search", searchHandler)

	port := 8090
	fmt.Printf("Starting server on port %v...", port)
	http.ListenAndServe(fmt.Sprint(":", port), nil)

	// results := search(index, &searchTerm)

	// fmt.Printf("Searching for \"%s\"\n", searchTerm)
	// if results != nil {
	// 	for _, result := range *results {
	// 		i, _ := strconv.Atoi(result)
	// 		fmt.Println((*records)[i])
	// 	}
	// }
}
