

function Home({ user }) {

    if(!user){
        return(
            <div>
                <h1>Please login!</h1>
            </div>
        )
    }
    return(
        <h1>Welcome, {user.name}</h1>
    )
}

export default Home