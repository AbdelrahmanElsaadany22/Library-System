import { Router } from "express"
import { authenticate, authorize } from "../../../auth/auth.middleware"
import { addBook, deleteBook, getAllBooks, getBookByName, getBooksForAuthor, updateBook } from "../controller/book.controller"
import { validate } from "../../../middlwares/validate"
import { AddBookSchema, deleteBookSchema, getBookByNameSchema, getBooksForAuthorSchema, updateBookSchema } from "../validations/book.validations"

const BookRouter=Router()

BookRouter.route('/Books').get(authenticate,authorize('admin','user'),getAllBooks)
BookRouter.route('/BooksOfAuthor').get(authenticate,authorize('admin','user'),validate(getBooksForAuthorSchema),getBooksForAuthor)




//tmam
BookRouter.route('/Book').post(authenticate,authorize('admin'),validate(AddBookSchema),addBook)
.get(authenticate,authorize('admin','user'),validate(getBookByNameSchema),getBookByName)
.delete(authenticate,authorize('admin'),validate(deleteBookSchema),deleteBook)
.put(authenticate,authorize('admin'),validate(updateBookSchema),updateBook)

export default BookRouter


