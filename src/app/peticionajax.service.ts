import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { initializeApp } from '@angular/fire/app';
import { getFirestore, deleteDoc, getDocs, collection, onSnapshot , query, where} from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { getAuth } from '@angular/fire/auth';
import { signInWithPopup, createUserWithEmailAndPassword,
  signInWithEmailAndPassword, } from '@angular/fire/auth';
import { onAuthStateChanged } from '@angular/fire/auth';
import { signOut } from '@angular/fire/auth';
import { GithubAuthProvider } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PeticionajaxService {
  datosapi:any[]=[];
  trendapi:any[]=[];
  detailapi:any;
  detailapig:any[]=[];
  datosFS:any[]=[];
  usuario:any
  firestore=inject(Firestore);
  constructor(private http: HttpClient, private router: Router) { }

  peticionajax(){
    this.http.get("https://api.coingecko.com/api/v3/coins/list").subscribe ((datos:any)=>{
      console.log(datos)
      this.datosapi = datos;
    })
  }

  peticiontrend(){
    this.http.get("https://api.coingecko.com/api/v3/search/trending").subscribe ((datos:any)=>{
      console.log(datos.coins)
      this.trendapi = datos.coins;
    })
  }

  peticiondetail(id:any){
    this.http.get("https://api.coingecko.com/api/v3/coins/"+id).subscribe ((datos:any)=>{
      console.log(datos)
      this.detailapi = datos;
    })
  }
  peticiondetailg(id:any){
    this.http.get("https://api.coingecko.com/api/v3/coins/"+id+"/market_chart?vs_currency=eur&days=30").subscribe ((datos:any)=>{
      console.log(datos)
      this.detailapig = datos.prices;
    })
  }
  obtenerFirest(){
    getDocs(collection(this.firestore, "mgCrypto")).then((response => {
      this.datosFS=response.docs.map
      (doc => doc.data())
      
      console.log(this.datosFS);
    }));
  }
  async obtenerDocumentosPorUid(uid: string) {
    const q = query(collection(this.firestore, 'mgCrypto'), where('uid', '==', uid));
    const querySnapshot = await getDocs(q);
    this.datosFS = querySnapshot.docs.map((doc) => doc.data());
    console.log(this.datosFS);
  }

  async obtenerDocumentosPorUidUsuarioActual(): Promise<any> {
    const auth = getAuth();

    return new Promise((resolve) => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const uid = user.uid;
          const documentos = await this.obtenerDocumentosPorUid(uid);
          resolve(documentos);
        } else {
          resolve([]);
        }
      });
    });
  }
  cerrarsesion(){
    const auth = getAuth();
        signOut(auth).then(() => {
        // Sign-out successful.
        }).catch((error) => {
        // An error happened.
        });
  }
  iniciarsesion(){
    const auth = getAuth();
    const provider= new GoogleAuthProvider;
    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    //const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log(user);
    this.router.navigate(["cuerpo"]);
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
    
  });
  }
  Usuario() {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      this.usuario = user;
      console.log("Nombre del usuario:", this.usuario?.photoURL);
    });
  }
  estaUsuarioIniciadoSesion(): Promise<boolean> {
    const auth = getAuth();

    return new Promise((resolve) => {
      onAuthStateChanged(auth, (user) => {
        resolve(!!user);
      });
    });
  }
  async isCoinInCollection(coinid: string): Promise<boolean> {
    const q = query(collection(this.firestore, 'mgCrypto'), where('coinid', '==', coinid));
    const querySnapshot = await getDocs(q);
    return querySnapshot.size > 0;
  }
  async iniciarSesionConGitHub(): Promise<void> {
    try {
      const auth = getAuth();
      const provider = new GithubAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      this.router.navigate(["cuerpo"]);
      console.log('Usuario inició sesión con GitHub exitosamente:', user);
    } catch (error) {
      console.error('Error al iniciar sesión con GitHub:', error);
      throw error;
    }
  }
  async eliminarMonedaFirestore(coinid: string): Promise<void> {
    try {
      const auth = getAuth();
      const uid = auth.currentUser?.uid;
      
      if (uid) {
        const q = query(collection(this.firestore, 'mgCrypto'), where('coinid', '==', coinid), where('uid', '==', uid));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.size > 0) {
          // Obtener el primer documento que cumple con la condición
          const docRef = querySnapshot.docs[0].ref;
          
          // Eliminar el documento de Firestore
          await deleteDoc(docRef);
          console.log(`Moneda con coinid ${coinid} eliminada exitosamente.`);
        } else {
          console.warn(`No se encontró ninguna moneda con coinid ${coinid} asociada al usuario.`);
        }
      } else {
        console.error('El usuario no está autenticado.');
        throw new Error('El usuario no está autenticado.');
      }
    } catch (error) {
      console.error('Error al intentar eliminar la moneda de Firestore:', error);
      throw error;
    }
  }
  registroEmailYPassword(email:any,password:any) {
        
    const auth= getAuth()
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        // ...
        

    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode,errorMessage)
        // ..
    });
}

iniciarSesion(email: string, password: string) {
  console.log('inicia sesion');
  const auth = getAuth();

  // Replace 'tu_email' y 'tu_contraseña' with the credentials you want to use
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);

      // Redirect the user to the 'notas-personales' page
      this.router.navigate(['notas-personales']);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
      // Handle login errors here
    });
}

}
