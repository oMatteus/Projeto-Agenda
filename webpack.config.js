const path = require('path');  //CommonJS
const MiniCssExtractPlugin = require('mini-css-extract-plugin');



module.exports = {
    mode: 'development', //modo desenvolvedor para manter a estrutura original
    entry: './frontend/main.js', //arquivo de entrada
    output: {
        path: path.resolve(__dirname, 'public', 'assets', 'js'), //Caminho de saída usando o resolve para que a formatação do caminho fique de acordo com sistema operacional (__dirname é a pasta atual)
        filename: 'bundle.js' //nome do arquivo de Saida
    },
    module: {
        //Rules é um array de objetos para aplicarmos as regras do webpack
        rules: [
            //Como vamos trabalhar somente com js, vamos criar apenas uma regra, mas eventualmente em conversão de outras tecnologias, haverá a necessidade de mais regras.
            {
                exclude: /node_modules/, //pasta a ser desconsiderado pelo webpack (expressão regular)
                test: /\.js$/, //Arquivo de teste (expressão regular para indicar que termina com .js)
                use: {
                    loader: 'babel-loader', //loader que instalamos anteriormente
                    options: {
                        presets: ['@babel/env'] //preset do babel (é um array pois pode haver mais de um preset)
                    }
                }
            },
            {
                test: /\.css$/, // Regra para arquivos .css
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
        ],
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: '../styles/styles.css',  // Nome do arquivo CSS gerado
        }),
      ],

    devtool: 'source-map' //mapeia o código compilado para facilitar o apontamento de erros no debug
};