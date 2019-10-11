# node-docs-api
This is basic user documents upload and download API using Node.Js, Express.Js using MongoDB database. 

# Start Project

git clone https://github.com/avneeshthakur/node-docs-api.git

npm install 

npm start ( default port is 4000)

#API End Points 

#User
/api/users/login POST
/api/users/signup POST

#Docs
/api/docs/upload POST
/api/docs/download:id GET ( id document _id) 
/api/docs/delete/:id DELETE ( id document _id)
/api/docs/getDocs GET 

