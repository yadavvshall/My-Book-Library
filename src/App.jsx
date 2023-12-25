import React, { useState, useEffect } from "react";
import BookCategory from "./components/BookCategory";
import BookList from "./components/BookList";
import BookSearch from "./components/BookSearch";
import BorrowingHistory from "./components/BorrowingHistory";
import {
  db,
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
} from "./firebase/firebase";

const App = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [borrowingHistory, setBorrowingHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const historyCollection = collection(db, "borrowingHistory");
        const historySnapshot = await getDocs(historyCollection);
        const historyData = historySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("Fetched Borrowing History:", historyData);

        
        setBorrowingHistory(historyData);

        
      } catch (error) {
        console.error("Error fetching borrowing history:", error.message);
      }
    };

    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const subjects = [
        "fantasy",
        "mystery",
        "science_fiction",
        "romance",
        "thriller",
        "epic",
        "horror",
        "clas",
      ];
      const allBooks = await Promise.all(
        subjects.map(async (subject) => {
          const apiUrl = `https://openlibrary.org/subjects/${subject}.json?limit=10`;
          const response = await fetch(apiUrl);

          if (!response.ok) {
            throw new Error(
              `Failed to fetch data for ${subject}. Status: ${response.status}`
            );
          }

          const data = await response.json();

          return data.works.map((work, index) => ({
            id: `book_${subject}_${index}`,
            title: work.title,
            author: work.authors ? work.authors[0].name : "Unknown Author",
            category: subject.charAt(0).toUpperCase() + subject.slice(1),
            available: true,
          }));
        })
      );

      setBooks(allBooks.flat());
      setFilteredBooks(allBooks.flat());
    } catch (error) {
      console.error("Error fetching books:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCategorySelect = (selectedCategory) => {
    if (selectedCategory === "") {
      setFilteredBooks(books);
    } else {
      const filtered = books.filter(
        (book) => book.category === selectedCategory
      );
      setFilteredBooks(filtered);
    }
  };

  const handleBookSearch = (term) => {
    setSearchTerm(term);
    const filtered = books.filter(
      (book) =>
        book.title.toLowerCase().includes(term.toLowerCase()) ||
        book.author.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredBooks(filtered);
  };

  const handleBorrowBook = async (book) => {
    
    const borrowerName = prompt("Enter your name or username:");

    if (!borrowerName) {
      
      return;
    }

  
    if (
      !book ||
      !book.id ||
      !book.title ||
      !book.author ||
      !book.category ||
      book.available === undefined
    ) {
      console.error("Invalid book data:", book);
      return;
    }

    
    const updatedBooks = books.map((b) =>
      b.id === book.id ? { ...b, available: false } : b
    );
    setBooks(updatedBooks);

    
    try {
      const docRef = await addDoc(collection(db, "borrowingHistory"), {
        bookId: book.id,
        borrowerId: borrowerName,
        borrowDate: serverTimestamp(),
      });
      const updatedHistory = [
        ...borrowingHistory,
        {
          ...book,
          id: docRef.id,
          borrowDate: new Date().toLocaleDateString(),
          borrower: borrowerName,
        },
      ];
      setBorrowingHistory(updatedHistory);
    } catch (error) {
      console.error("Error adding borrowing history: ", error);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-indigo-800 mb-8 justify-center items-center flex">
        My Book Library
      </h1>

      <BookCategory
        categories={[
          "Classic",
          "Dystopian",
          "Science Fiction",
          "Adventure",
          "Fantasy",
          "Romance",
          "Horror",
          "Gothic",
          "Historical Fiction",
          "Philosophical",
          "Magical Realism",
          "Satire",
          "Epic",
          "Social Realism",
          "Mystery",
          "Thriller",
          "Young Adult",
          "Post-Apocalyptic",
        ]}
        onSelectCategory={handleCategorySelect}
      />
      <BookSearch onSearch={handleBookSearch} />
      <BookList books={filteredBooks} onBorrow={handleBorrowBook} />
      <BorrowingHistory history={borrowingHistory} />
    </div>
  );
};

export default App;
