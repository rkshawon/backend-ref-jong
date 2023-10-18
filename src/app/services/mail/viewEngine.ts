import path from 'path';

const handlebarOptions = {
  viewEngine: {
    extName: '.handlebars',
    partialsDir: path.resolve(__dirname, 'template'),
    defaultLayout: false,
  },
  viewPath: path.resolve(__dirname, 'template'),
  extName: '.handlebars',
};

export default handlebarOptions;
