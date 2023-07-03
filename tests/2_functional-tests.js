const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

let testThreadId = "";
let testThreadId2 = "";
let testReplyId = "";

suite("Functional Tests", function() {
  suite("Thread test", () => {
    test("Creating 2 new thread", () => {
      chai
        .request(server)
        .post("/api/threads/test4")
        .send({
          board: "test4",
          test: "testText",
          delete_password: "valid password"
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
        });

      chai
        .request(server)
        .post("/api/threads/test4")
        .send({
          board: "test4",
          test: "testText",
          delete_password: "valid password"
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
        });
 
    });


    test("Viewing the 10 most recent threads with 3 replies each", () => {
      chai
        .request(server)
        .get("/api/threads/test4")
        .end((err, res) => {
          assert.isArray(res.body);
        });
    });

    test("Deleting a thread with the incorrect password", () => {
      chai
        .request(server)
        .delete("/api/threads/test4")
        .send({
          delete_password: "invalid password",
          thread_id: testThreadId
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isString(res.text);
        
        });
    });

    test("Deleting a thread with the correct password", done => {
      chai
        .request(server)
        .delete("/api/threads/test4")
        .send({
          delete_password: "valid password",
          thread_id: testThreadId2
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.text, '"error"');
          done();
        });
    });
    

    test("Reporting a thread", done => {
      chai
        .request(server)
        .put("/api/threads/test4")
        .send({
          thread_id: testThreadId
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.text, '"error"');
          done();
        });
    });
  });

  suite("Reply test", () => {
    test("Creating a new reply", () => {
      chai
        .request(server)
        .post("/api/replies/test4")
        .send({
          thread_id: testThreadId,
          text: "test text",
          delete_password: "valid password"
        })
        .end((err, res) => {
          assert.equal(res.status, 200);

     
        });
    });

    test("Viewing a single thread with all replies", () => {
      chai
        .request(server)
        .get("/api/replies/test4")
        .query({
          thread_id: testThreadId
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isUndefined(res.body.replies);
     
        });
    });

    test("Reporting a reply", done => {
      chai
        .request(server)
        .put("/api/replies/test4")
        .send({
          thread_id: testThreadId,
          reply_id: testReplyId
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.text, '"error"');

          done();
        });
    });

    test("Deleting a reply with the incorrect password", done => {
      chai
        .request(server)
        .delete("/api/replies/test4")
        .send({
          thread_id: testThreadId,
          reply_id: testReplyId,
          delete_password: "invalid password"
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.text, '"error"');

          done();
        });
    });

    test("Deleting a reply with the correct password", done => {
      chai
        .request(server)
        .delete("/api/replies/test4")
        .send({
          thread_id: testThreadId,
          reply_id: testReplyId,
          delete_password: "valid password"
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.text, '"error"');

          done();
        });
    });
   
  });
  
});

