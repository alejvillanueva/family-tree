
const newName = document.getElementById('name');
const newAge = document.getElementById('age');
const button = document.querySelector('button');
let tree = document.getElementById('tree');
let familyTree;
let currSelected;
let generationToAddTo = 1;

class FamilyTree {
  constructor(name, age) {
    if (typeof name !== 'string') {
      throw 'error';
    }
    this.value = name;
    this.age = age;
    this.children = [];
  }

  familySize() {
    return this.children.length + 1;
  }

  findMember(name) {
      if (this.value === name) {
        return this
      } else {
        for (let i = 0; i < this.children.length; i++) {
          if (this.children[i].findMember(name) !== undefined) {
            return this.children[i].findMember(name)
          }
        }
      }
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

  insert(name, age) {
    let child = new FamilyTree(name, age);
    this.children.push(child);
  }
}

button.addEventListener("click", function(){
    let ul = document.getElementById(`gen${generationToAddTo}`);

    if(ul === null){
      let h3 = document.createElement('h3');
      h3.textContent = (`Generation ${generationToAddTo}`);
      tree.appendChild(h3);

      ul = document.createElement('ul');
      ul.setAttribute('id', `gen${generationToAddTo}`)
      tree.appendChild(ul);
    }


    let li = document.createElement('li');
    li.textContent = `${newName.value} ${newAge.value}`;
    li.setAttribute("onclick", "toAdd(this)")
    li.setAttribute("selected", "false")
    ul.appendChild(li)

    if(familyTree){
      let parentName = currSelected.textContent.split(' ').slice(0,-1).join(" ");
      let parent = familyTree.findMember(parentName);
      parent.insert(newName.value, newAge.value);
    }
    else{
      familyTree = new FamilyTree(newName.value, newAge.value)
      generationToAddTo++;
      currSelected = li;
    }

    console.log(familyTree.log());
});

function toAdd(obj){
  currSelected.setAttribute('selected', 'false');
  currSelected = obj;
  generationToAddTo = parseInt(currSelected.parentElement.id.slice(-1)) + 1;
}


module.exports = FamilyTree;
