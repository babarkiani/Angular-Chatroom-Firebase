import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

 chatId;

  constructor(private afs: AngularFirestore, private auth: AuthService) { }

 /* user */

  // Create
  createUser(uid, data) {
    return this.afs.doc('users/' + uid).set(data);
    }
      // Read One
    getUser(uid) {
      return this.afs.doc('users/' + uid).valueChanges();
    }

    getUserWithId(uid) {
      return this.afs.collection('users', resp => resp.where('id', '==', uid)).snapshotChanges();
    }
      // Read ALL
      getCustomers(uid) {
    return this.afs.doc('users').snapshotChanges();
    }
      // Update
    updateCustomer(uid, data) {
      this.afs.doc('users/' + uid).update(data);
    }
      // Delete
    deleteCustomer(uid) {
      return this.afs.doc('users/' + uid).delete();
    }


    ///////// Chatroom Service
    chatRoom() {
      return this.afs.collection('chatrooms').valueChanges();
    }

    changeChatroom(chatroomId)
    {
      this.chatId=chatroomId;
      console.log(chatroomId);
      return this.afs.doc('chatrooms/' + chatroomId).valueChanges();
    }

    ChatroomMessages(chatroomId)
    {
      this.chatId=chatroomId;
      console.log(chatroomId);
      return this.afs.collection
      ('chatrooms/' + chatroomId + '/messages', ref => {
        return ref.orderBy('createdAt', 'asc').limit(100);
      }).valueChanges();
    }

    createMessage(message,data) {
      let m = {
        message: message,
        createdAt: new Date,
        sender: data
      }

      return this.afs.collection('chatrooms/' + this.chatId + '/messages').add(m);
    }

}

