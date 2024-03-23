export function getMemberId() {
  const userJson = sessionStorage.getItem("user");

  if (userJson) {
    const user = JSON.parse(userJson);
    return user.memberId;
  }
}

export function getMemberEmail() {
  const userJson = sessionStorage.getItem("user");

  if (userJson) {
    const user = JSON.parse(userJson);
    return user.email;
  }
}
