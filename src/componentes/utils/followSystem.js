import { db } from "../../firebase/firebase";

export const addFollow = async (targetUser, actualUser, func) => {
    const thisUser = {...actualUser};
    const { fullName, avatar, id } = thisUser;

    targetUser.followers = [...targetUser.followers, { fullName, avatar, id }];
    thisUser.follow = [
      ...thisUser.follow,
      {
        fullName: targetUser.fullName,
        avatar: targetUser.avatar,
        id: targetUser.id,
      },
    ];

    await db.collection("user").doc(targetUser.id).set(targetUser);
    await db.collection("user").doc(actualUser.id).set(thisUser);

    if(func) func(true);
  };

export const unFollow = async (targetUser, actualUser, func) => {
    const thisUser = { ...actualUser };

    targetUser.followers = targetUser.followers.filter(
      (user) => user.id !== thisUser.id
    );
    thisUser.follow = thisUser.follow.filter(
      (user) => user.id !== targetUser.id
    );

    await db.collection("user").doc(targetUser.id).set(targetUser);
    await db.collection("user").doc(actualUser.id).set(thisUser);

    if(func) func(false);
  };

export const removeFollower = async (targetUser, actualUser) => {
    const thisUser = {...actualUser};
    
    thisUser.followers = thisUser.followers.filter(follower => follower.id !== targetUser.id);
    targetUser.follow = targetUser.follow.filter(following => following.id !== thisUser.id)

    await db.collection('user').doc(thisUser.id).set(thisUser);
    await db.collection('user').doc(targetUser.id).set(targetUser);
  };