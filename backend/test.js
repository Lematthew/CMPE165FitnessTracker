require("firebase/firestore");
const firebase = require('firebase-admin');
// admin.initializeApp();
const serviceAccount = require("./fitness-tracker-5c549-firebase-adminsdk-yzgd2-2110dfef74.json")
var firebaseConfig = require("./prod.json")
firebaseConfig.credential = firebase.credential.cert(serviceAccount)
firebase.initializeApp(firebaseConfig)
// Firebase previously initialized using firebase.initializeApp().
var db = firebase.firestore();
// db.useEmulator("localhost", 8080);

async function deleteCollection(db, collectionPath, batchSize) {
    const collectionRef = db.collection(collectionPath);
    const query = collectionRef.orderBy('__name__').limit(batchSize);
  
    return new Promise((resolve, reject) => {
      deleteQueryBatch(db, query, resolve).catch(reject);
    });
  }
  
  async function deleteQueryBatch(db, query, resolve) {
    const snapshot = await query.get();
  
    const batchSize = snapshot.size;
    if (batchSize === 0) {
      // When there are no documents left, we are done
      resolve();
      return;
    }
  
    // Delete documents in a batch
    const batch = db.batch();
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
  
    // Recurse on the next process tick, to avoid
    // exploding the stack.
    process.nextTick(() => {
      deleteQueryBatch(db, query, resolve);
    });
  }

async function testSetUp() {
    console.log("---tests_start---");
    const docRef = await db.collection('test_Users').doc('test_user');
    docRef.set({
        "goals": []
    })
}

async function testTearDown() {
    deleteCollection(db, 'test_Users', 1000)
    deleteCollection(db, 'test_Exercises', 1000)
    console.log("---tests_end---");
}

async function testAdd () {
    console.log("testing add")
    const testCollection = {
        "name": "testColl",
    }
    const testUser = {
        "goals": []
    }
    const res  = await db.collection('test_Exercises').add(testCollection);
    const doc  = await db.collection('test_Users').doc("testUser");
    doc.set(testUser);

}

async function main() {
    await testSetUp()
    try{
        await testAdd()
    } catch(thing) {
        console.log(thing)
    }
    await testTearDown()
}

main()