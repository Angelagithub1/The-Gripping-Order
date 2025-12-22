const User = (req,res)=>{
    const {user}=req.params;
    const datos = req.body;
    const ruta = `./src/data/${user}.json`;

    if(!fs.existsSync(ruta)){
        return res.status(404).json({error:"Usuario no encontrado"});
    }

    const contenido = JSON.parse(fs.readFileSync(ruta));

    const usuarioActualizado = {...contenido,...datos};

    fs.writeFileSync(ruta,JSON.stringify(usuarioActualizado,null,2));

    res.json({message:"Usuario actualizado correctamente"});

}