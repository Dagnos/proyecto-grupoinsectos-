const mongoose   = require('mongoose');
const Schema     =mongoose.Schema;

const usuariosSchema  = new Schema({
  correo: String,
  contraseña: String
});

const usuariosModel = mongoose.model('usuarios', usuariosSchema);

module.exports = {
  create: (req,res,next)=>{
    const usuario = new usuariosModel({
      _id: new mongoose.Types.ObjectId(),
      correo: req.body.correo,
      contraseña: req.body.contraseña
    });
    usuario
      .save()
      .then(result => {
        res.status(200).json({
          message: 'usuario creado con exito',
          data: {
            ...result["_doc"]
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error:err
        });
      });
  },
  find: (req, res, next) => {
    usuariosModel.find()
        .select('_id correo contraseña')
        .exec()
        .then(docs => {
          const response = {
            count: docs.length,
            data: docs.map(doc=>{
              return{
                ...doc["_doc"]
              };
            })
          };
          res.status(200).json(response);
        })
        .catch(err=>{
          console.log(err);
          res.status(500).json({
            error:err
          });
        });
    },
  update: (req,res,next) => {
      const id = req.params.id;
      let updateParams = {
        ...req.body
      };
      usuariosModel.update({_id:id},{$set: updateParams})
          .exec()
          .then(result => {
            res.status(200).json({
              message: 'usuario Actualizado'
            });
          })
          .catch(err =>{
            console.log(err);
            res.status(500).json({
              error:err
            });
          });
  },
  findOne: (req,res,next)=>{
    const id = req.params.id;
    Plan.findById(id)
        .select('_id correo contraseña')
        .exec()
        .then(doc => {
          if (doc) {
            res.status(200).json({
              data: doc,
            });
          }else{
            res.status(404).json({message: 'No valid entry found for provided ID'});
          }
        })
        .catch(err =>{
          console.log(err);
          res.status(500).json({
            error: err
          });
        });
  },
  delete: (req,res,next)=>{
    const id = req.params.id;
    usuariosModel.remove({_id:id})
        .exec()
        .then(result => {
          res.status(200).json({
            message: 'usuario eliminado'
          });
        })
        .catch(err =>{
          console.log(err);
          res.status(500).json({
            error:err
          });
        });
  }
};
