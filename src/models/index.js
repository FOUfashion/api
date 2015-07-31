import Account from './account';
import Profile from './profile';

import Client from './client';
import Token from './token';
import Code from './code';

import Comment from './comment';
import Post from './post';

// Account
Account.ensureIndex('id');

Account.hasOne(Profile, 'profile', 'id', 'accountId');
Account.hasMany(Post, 'posts', 'id', 'accountId');

Account.hasMany(Client, 'clients', 'id', 'accountId');
Account.hasMany(Token, 'tokens', 'id', 'accountId');
Account.hasMany(Code, 'codes', 'id', 'accountId');

// Profile
Profile.ensureIndex('id');
Profile.ensureIndex('accountId');

Profile.belongsTo(Account, 'account', 'accountId', 'id');

// Client
Client.ensureIndex('accountId');

Client.belongsTo(Account, 'account', 'accountId', 'id');
Client.hasMany(Token, 'tokens', 'id', 'clientId');
Client.hasMany(Code, 'codes', 'id', 'clientId');

// Token
Token.ensureIndex('clientId');
Token.ensureIndex('accountId');

Token.belongsTo(Account, 'account', 'accountId', 'id');
Token.belongsTo(Client, 'client', 'clientId', 'id');

// Code
Code.ensureIndex('clientId');
Code.ensureIndex('accountId');

Code.belongsTo(Account, 'account', 'accountId', 'id');
Code.belongsTo(Client, 'client', 'clientId', 'id');

// Comment
Comment.ensureIndex('postId');
Comment.ensureIndex('accountId');

Comment.belongsTo(Post, 'post', 'postId', 'id');
Comment.belongsTo(Account, 'account', 'accountId', 'id');

// Post
Post.ensureIndex('accountId');

Post.belongsTo(Account, 'account', 'accountId', 'id');
Post.hasMany(Comment, 'comments', 'id', 'postId');
