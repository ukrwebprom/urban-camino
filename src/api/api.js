const API = 'http://localhost:5000/api/'; // твой backend

export async function createUser(firebaseUser) {
  const body = {
    uid: firebaseUser.uid,
    name: firebaseUser.displayName || 'No name',
    email: firebaseUser.email,
  };

  const res = await fetch(API+'users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  return await res.json(); // возвращает данные пользователя из MongoDB
}

export async function showAllUsers() {
  const res = await fetch(`${API}users`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    // body: JSON.stringify(''),
  });

  return await res.json(); // возвращает данные пользователя из MongoDB
}

export async function showUserByUid(uid) {
  const res = await fetch(`${API}users/${uid}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  return await res.json(); // возвращает данные пользователя из MongoDB
}