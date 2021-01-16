
const newName = document.getElementById('name');
const newAge = document.getElementById('age');
const button = document.querySelector('button');

const genOne = document.getElementById('g1');
const genTwo = document.getElementById('g2');
const genThree = document.getElementById('g3');

class FamilyTree {
  constructor(name) {
    if (typeof name !== 'string') {
      throw 'error';
    }
    this.value = name;
    this.children = [];
  }

  familySize() {
    return this.children.length + 1;
  }

  findMember(name) {
    let child = undefined;
    this.children.forEach(obj => {
      if (obj.value === name) {
        child = obj;
      }
    });
    return child;
  }

  log() {
    function members(obj, level) {
      let string = `${level} ${obj.value}\n`;
      if (obj.children.length === 0) {
        return string;
      } else {
        level += '--'
        obj.children.forEach(child => {
          string += `${members(child, level)}`
        })
        return string;
      }
    }
    return members(this, '--');
  }

  insert(name) {
    let child = new FamilyTree(name);
    this.children.push(child);
  }
}

let node;

button.addEventListener("click", function(){
  if(!node){
    node = new FamilyTree(newName.value)
    document.getElementById('h1').hidden = false;
    genOne.innerHTML = `<li>${node.value}</li>`;
  }

  else{
    node.insert(newName.value);
    document.getElementById('h2').hidden = false;
    genTwo.innerHTML = `<li>${node.children[0]['value']}</li>`;
  }


});

module.exports = FamilyTree;
