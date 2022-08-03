import {initializeApp} from "firebase/app";
import {initializeAppCheck, ReCaptchaV3Provider} from "@firebase/app-check";
import {
    getFirestore,
    collection,
    getDoc,
    getDocs,
    where,
    doc,
    query,
    addDoc,
    updateDoc,
    deleteDoc}
    from "firebase/firestore/lite";


export class FirebaseCrud {
    constructor(collectionName) {
        this.config = {
            apiKey: "AIzaSyBnayFnmXsJfvVEu7X1oix70Zhs3lK5JwE",
            authDomain: "ark-alarm.firebaseapp.com",
            projectId: "ark-alarm",
            storageBucket: "ark-alarm.appspot.com",
            messagingSenderId: "82556541130",
            appId: "1:82556541130:web:1c7f9328e40ef7457dfc33",
            measurementId: "G-6D6P3WX13T"
        };
        this.db = undefined;
        this.collectionName = collectionName;
        this.id=null;
        this.data = null;
        this.init();
    }
    init(){
        let app =  initializeApp(this.config);
        initializeAppCheck(app, {
            provider: new ReCaptchaV3Provider('6LeZxpYgAAAAALRDSobD1r5GDeX_L8nauQdm_KPN'),
            });
        this.db = getFirestore(app);

    }
    async getFromDatabase(name){
        const users = collection(this.db, this.collectionName);
        const queryConstraints = where("Discord Server", "==", name);
        const userSnapshot = await getDocs(query(users, queryConstraints));
        if(this.id === null){
        this.id = userSnapshot.docs[0].id;
        }
        let data = userSnapshot.docs.map(doc => doc.data()).map(doc => doc.Configs)[0];
        let res = {data,name}
        this.data = res;
        return res
    }
    async AddToDatabase(name,data){
        const docRef = await addDoc(collection(this.db, this.collectionName), {"Discord Server": name, Configs: data});
        this.id = docRef.id;
    }
    async UpdateDatabase(data){
        if(!this.id){
            await this.getDocFromDatabaseById(data["Discord Server"]);
        }
        const docRef = doc(this.db,this.collectionName,this.id);
        await updateDoc(docRef,data);
    }
    async getDocFromDatabaseById(id){
        const docRef = doc(this.db,this.collectionName,id);
        const docSnapshot = await getDoc(docRef);
        return docSnapshot.data();
    }
    async DeleteFromDatabase(id){
        const docRef = doc(this.db,this.collectionName,id);
        await deleteDoc(docRef);
    }
}
export class KeyCrud extends FirebaseCrud{
    async getFromDatabase(id){
        let docRef = doc(this.db,this.collectionName,id);
        let dataSnapshot = await getDoc(docRef);
        if(this.id === null){
            this.id = dataSnapshot.id;
        }
        return dataSnapshot.data();
    }
    async AddToDatabase(data){
        const docRef = await addDoc(collection(this.db, this.collectionName), {"name": data});
        this.id = docRef.id;
    }
}
