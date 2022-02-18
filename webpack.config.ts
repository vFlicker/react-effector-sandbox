import path from 'path';
import { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

interface Configuration extends WebpackConfiguration {
  devServer: WebpackDevServerConfiguration;
}

const config: Configuration = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src/index.tsx'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          transpileOnly: true
        }
      },
      {
        test: /\.(css)$/,
        use: [ 'style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|ico)$/,
        loader: 'file-loader',
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
  ],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src/') },
    extensions: ['.tsx', '.ts', '.js'],
  },
  devServer: {
    static: path.resolve(__dirname, 'public'),
    port: 3333,
    open: true,
    historyApiFallback: true,
  }
};

export default config;
