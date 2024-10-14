function Container({children,className}) {
   
    return (
        <div className={`${className} container containerCentralized mx-auto border bg-white border-gray-300 px-3`}>
            {children}
        </div>
    )
}

export default Container
