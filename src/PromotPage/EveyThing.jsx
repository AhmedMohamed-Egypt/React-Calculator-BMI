function EveyThing() {
    const items = [{img:'https://www.mindsetsnreps.com/images/premium_photo-1670505062582-fdaa83c23c9e',title:'Personalized Fitness Plans',text:'Experience tailored fitness programs designed to meet your unique goals and lifestyle.'},
                   {img:'https://www.mindsetsnreps.com/images/free-photo-of-men-at-gym.jpeg',title:'One-on-One Coaching',text:'Work one-on-one with a dedicated coach to improve your mindset, strength, and fitness.'},
                   {img:'https://www.mindsetsnreps.com/images/group-of-healthy-food-for-flexitarian-diet.jpg',title:'Custom Nutrition Plans',text:'Transform your diet with expert guidance that complements your fitness journey seamlessly'},
    ]
    return (
        <div className="everything py-[100px]">
            <div className="container mx-auto">
             <div className="everything__container">
             <h2 className="text-5xl font-bold font-anton  text-white mb-[100px]">We Have Everything You Are Looking For</h2>
             <div className="everything__cards flex items-center justify-between">
                 {items.map((item)=><div style={{width:"350px"}}>
                    <img src={item.img}  style={{height:"200px"}}/>
                    <h3 className="my-[20px] text-2xl font-bold font-anton  text-white ">{item.title}</h3>
                    <p>{item.text}</p>
                 </div>)}
             </div>
             </div>
            </div>
        </div>
    )
}

export default EveyThing
