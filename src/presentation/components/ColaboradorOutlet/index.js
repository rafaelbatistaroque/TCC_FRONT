import React from 'react';
import { Outlet } from 'react-router';
import Header from '../Header';

const ColaboradorOutlet = () => {

    return <>
        <Header />
        <div className={`container`}><Outlet /></div></>;

};

export default ColaboradorOutlet;