import { useNavigate, useParams } from "react-router";
import React, { useEffect, useState } from "react";
import { getProfile, } from "../actions/server-actions";
import Comments from './Comments';

const PublicProfile = () => {
    const { username } = useParams();
    const [profile, setProfile] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            const profileData = await getProfile(username).catch(e => navigate("/"));
            setProfile(profileData);
        };
        fetchProfile();
    }, [username, navigate]);

    return (
        <div className="row h-100 justify-content-center align-items-center">
            <div className="col-6 text-center">
                <h1>{profile.username}</h1>
                <div className="mt-5">
                    <Comments userId={profile._id} comments={profile.comments} />
                </div>
            </div>
        </div>
    );

};

export default PublicProfile;