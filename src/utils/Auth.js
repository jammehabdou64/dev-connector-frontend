class Auth {
  constructor(auth) {
    this.auth = auth?.user ? auth?.user : auth;
    this._id = this.auth?._id;
    this.name = this.auth?.name;
    this.email = this.auth?.email;
    this.location = this.auth?.location;
    this.slug = this.name?.replace(/\s/g, "-");
    this.avatar = this.auth?.avatar;
    this.status = auth?.user ? auth?.status : "";
    this.status = auth?.user ? auth?.status : "";
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
