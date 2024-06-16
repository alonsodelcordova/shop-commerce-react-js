import { useEffect, useState } from "react";
import LoaderComponent from "../components/Loader";
import getPosts from "../services/post.service";
import { Post } from "../types/Post";

export function HomePage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    
    const cargarData = async() => {
        setPosts(await getPosts())
        setLoading(false);
    }

    useEffect(() => {
        cargarData();

    }, [])
    return (
        <>
            
            {loading && <LoaderComponent/>}


            <div className="container my-2">
                <div className="row">
                    {posts.map((post) => {
                        return (
                            <div className="col-md-6 col-lg-6 p-2" key={post.id}>
                                <div className="card" style={{ height: '100%' }}>
                                    <div className="card-header">
                                        <h5 className="uppercase center">{post.title}</h5>
                                    </div>
                                    <div className="card-body">
                                        <p className="post-body">{post.body}</p>
                                    </div>
                                    <div className="card-footer">
                                        <button className="btn btn-danger">Delete</button>
                                    </div>
                                </div>

                            </div>
                        );
                    })}
                </div>

            </div>
        </>
    )
}