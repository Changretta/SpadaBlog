
const path = require(`path`);
const { creatFilePath } =  require(`gatsby-source-filesystem`)



exports.onCreateNode = ({node , getNode , actions}) => {
    const { createNodeField } = actions
    if(Node.internal.type === `MarkdownRemark`){
        const slug = creatFilePath({node, getNode })
        createNodeField({
            node,
            name:`slug`,
            value:slug
        })
    } 
}

exports.createPages = ({ graphql , actions}) => {
    const {createPage} = actions
    return graphql(`
    {
        allMarkdownRemark {
        edges {
          node {
              fields { 
                  slug
              }
          }
        }
      }
    
}
    `).then(result => {
        result.data.allMarkdownRemark.edges.forEach(({node}) => {
            createPage({
                path: node.fields.slug,
                component: path.resolve(`./src/templates/blog-posts.js`),
                context: {
                    slug:node.fields.slug
                }
            })
            
        });
    })
}