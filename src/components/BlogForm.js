import React, { Fragment} from "react"
import { Card, Form, Button} from "react-bootstrap"
import { postsDb } from '../firebase'
import {storage} from '../firebase'


const BlogForm = (
        { 
          values, 
          setValues, 
          initialFiledValues, 
          currentPostKey, 
        }) => {

const handleInputChange = e => {
   let { name, value} = e.target
   setValues({
     ...values,
     [name]: value
     
   })
}

const addBlog = obj => {
  postsDb.ref().child('posts').push(obj)
}

const updateBlog =  (obj) => {
 postsDb.ref('posts').child(currentPostKey).update({...obj})
}

const handleFormSubmit = e => {
    e.preventDefault();
    const {title, description, author, url } = values;
    if(title === '' || description === '' || author === '' || url === ''){
      alert("Missing Values")

    }else{
      const date = new Date()
      values.date = (date.getMonth() + 1 ) + "-" + date.getDate() + "-" + date.getFullYear()
      if(currentPostKey){
        updateBlog(values)

      }else{
        addBlog(values)
      }   
    setValues({...initialFiledValues})

}

}

const handleFileChange = async (e) => {
  
  const file = e.target.files[0]
  const storageRef = storage.ref()
  const fileRef = storageRef.child(file.name)
  await fileRef.put(file)
  const fileUrl = await fileRef.getDownloadURL()

   setValues({
     ...values,
     url: fileUrl  
   })
}

  return (
    <Fragment>
    <div className="container">
      <Card className="article-card">
           <h1 className="text-center">Create Your New Blog</h1>
          <Card.Body>
            <Form  onSubmit={handleFormSubmit}>
                  <Form.Group>
                      <Form.Label>Title</Form.Label>
                      <Form.Control type="text" value={values.title} placeholder="title" 
                            name="title" onChange={handleInputChange}/>
                  </Form.Group>
                   <Form.Group>
                      <Form.Label>Description</Form.Label>
                        <Form.Control type="text" value={values.description} placeholder="description" 
                            name="description" onChange={handleInputChange}
                         />
                  </Form.Group> 
                  <Form.Group>
                    <Form.Label>Author</Form.Label>
                        <Form.Control type="text" value={values.author} placeholder="author" 
                              name="author" onChange={handleInputChange}/>
                  </Form.Group> 
                  <Form.File.Input onChange={handleFileChange} className="card-image-top" 
                            width="100%"
                            src=""
                            alt="blogPicture"/>           
                  <Button className="w-100" type="submit"
                      style={{backgroundColor: "#00cc00", borderRadius: "15px"}}>
                         Save
                  </Button>
              </Form>
        </Card.Body>
      </Card>     
  </div>
    </Fragment>
  )
}
export default BlogForm;
