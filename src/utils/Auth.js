class Auth {
  constructor(auth) {
    this.auth = auth?.user ? auth?.user : auth;
    this._id = this.auth?._id;
    this.email = this.auth?.email;
    this.slug = this.auth?.name.replace(/\s/g, "-");
    this.avatar = this.auth?.avatar;
    this.friends = this.auth?.friends;
    this.numOfFriends = this.auth?.friends.length;
    this.viewedProfile = this.auth?.viewedProfile?.length;
  }

  numbOfPosts(posts) {
    const numbOfposts = posts?.filter(
      (post) => post?.author?._id === this._id,
      0
    )?.length;
    return numbOfposts > 0 ? numbOfposts : "";
  }
}

export default Auth;
