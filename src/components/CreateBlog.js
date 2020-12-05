import React, { useState, useEffect } from "react";
import BlogForm from "./BlogForm";
import { Card, Button } from "react-bootstrap";
import { postsDb } from '../firebase';
import {useAuth} from '../contexts/AuthContext';
import { Redirect } from "react-router-dom";

const BlogPage = () => {
  const {currentUser} = useAuth();
  const initialFiledValues = { 
    title: '',
    description: '',
    author: '',
    date: '',
    url: '',
    uid: currentUser.uid
}
const [ values, setValues ] = useState({...initialFiledValues})
const [currentPostKey, setCurrentPostKey] = useState('')
const [myPosts, setMyPosts] = useState([])

const deleteBlog =  (mypostkey) => {
  if(window.confirm("Are you sure to delete this record?")){
      postsDb.ref('posts').child(mypostkey).remove()
        setCurrentPostKey("")
      }     
  }

  useEffect(() =>  {
    postsDb.ref('posts').on("value", snapshot => {
         let postlist = [];
         snapshot.forEach(snap => {
             if(snap.val().uid && snap.val().uid === currentUser.uid){
               let data = {
                 key: snap.key,
                 values: snap.val()
               }
                 postlist.push(data);
             }
             setMyPosts(postlist)
         })   
     })
 }, [currentUser.uid])

  return (
      <>
        <div className="container d-flex">
            <div className="col-6">
                <BlogForm 
                      values={values} setValues={setValues} 
                      initialFiledValues={initialFiledValues} 
                      currentPostKey={currentPostKey} 
                />
            </div>
              <div className="col-5"> 
                  {myPosts.map((mypost, index) => { 
               return  <Card className="article-card p-4" key={index}>
                            <span style={{color: "#00cc00", fontSize: "1.1rem"}}>{currentPostKey ? "Blog Created Successfuly!!" : ""}</span> 
                                  <Card.Body>
                                      <Card.Img className="card-image-top" 
                                              width="100%"
                                              src= {mypost.values.url}
                                              alt="blogPicture"
                                        />
                                        <Card.Title><i>Title:</i> {mypost.values.title}</Card.Title>
                                        <Card.Text><i>Description:</i> {mypost.values.description}</Card.Text>
                                        <Card.Text><i>Author: </i>{mypost.values.author}</Card.Text>
                                        <Card.Text><i>Date: </i>{mypost.values.date}</Card.Text>
                                        <Button className="btn-primary" onClick={() => {
                                          setCurrentPostKey(mypost.key)
                                          setValues({...mypost.values})
                                          } 
                                          }>Update</Button>
                                        <Button className="btn-danger ml-2" onClick={() => {
                                          
                                          deleteBlog(mypost.key)

                                          }
                                          }>Delete</Button>
                                  </Card.Body>
                             </Card> 
                  }
                  ) }
                  
               </div>
        </div>       
      </>   
  )
 } 

const NewBlogPage = () =>{ 
  const {currentUser} = useAuth();
  if(!currentUser){
   return <Redirect to="/signin"/>
  }else{
      return <BlogPage/>
  }
}
export default NewBlogPage
