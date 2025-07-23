import { Outlet, useLoaderData } from 'react-router-dom'

export default function FactsLayout() {

    const resource = useLoaderData();

    return (
        <div className="facts-layout">
            <h1>{resource?.id}</h1>
            <h2>Facts</h2>
            <Outlet context={{ resource }}/>
        </div>
    )
}