import { useState } from 'react'

interface FileItem {
  name: string
  type: 'folder' | 'file'
  size?: string
  modified: string
  content?: string
}

function FTPDiskPage() {
  const [currentPath, setCurrentPath] = useState('/')
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null)

  const fileSystem: { [key: string]: FileItem[] } = {
    '/': [
      { name: 'algorithms', type: 'folder', modified: '2023-09-15 14:30' },
      { name: 'electronic', type: 'folder', modified: '2023-09-20 10:15' },
      { name: 'programming', type: 'folder', modified: '2023-09-18 16:45' },
      { name: 'physics', type: 'folder', modified: '2023-09-12 09:20' },
      {
        name: 'readme.txt', type: 'file', size: '2.1 KB', modified: '2023-09-01 12:00',
        content: 'Welcome to the student drive!\n\nHere you\'ll find:\n- Lecture notes\n- Archival exams\n- Excercises solutions\n\nGood luck!\n- Admin,'
      }
    ],
    '/algorithms': [
      { name: '..', type: 'folder', modified: '' },
      { name: 'archive_exams', type: 'folder', modified: '2023-09-15 14:30' },
      { name: 'lecture_notes', type: 'folder', modified: '2023-09-15 14:25' },
      {
        name: 'graph_theory.txt', type: 'file', size: '15.3 KB', modified: '2023-09-10 11:30',
        content: 'GRAPH THEORY - notes\n\nGraph is a structure consisting of:\n- Vertices (V)\n- Edges (E)\n\nGraph algorithms:\n1. DFS - deep search\n2. BFS\n3. Dijkstra - shortest path\n4. Kruskal - minimal tree\n\nBig O notations:\n- DFS/BFS: O(V + E)\n- Dijkstra: O((V + E) log V)\n- Kruskal: O(E log E)'
      }
    ],
    '/algorithms/lecture_notes': [
      { name: '..', type: 'folder', modified: '' },
      {
        name: 'readme.txt', type: 'file', size: '8.7 KB', modified: '2022-04-07 21:37',
        content: 'Jesus Christ, you seriously thought someone was on the lecture?'
      },
    ],
    '/algorithms/archive_exams': [
      { name: '..', type: 'folder', modified: '' },
      {
        name: 'exam_2022.txt', type: 'file', size: '8.7 KB', modified: '2022-06-20 15:00',
        content: 'ALGORITHMS EXAM - JUNE 2022\nProf. Czegniew Zbich\n\n1. Which of the following is a sorting algorithm?\nA) Bubble Sort\nB) Quick Sort\nC) Merge Sort\nD) All of the above\nANSWER: D\n\n2. What is the time complexity of the Binary Search algorithm?\nA) O(n)\nB) O(log n)\nC) O(n²)\nD) O(n log n)\nANSWER: B\n\n3. Which data structure works on a LIFO basis?\nA) Queue\nB) Stack\nC) Tree\nD) Graph\nANSWER: B\n\n4. Divide and conquer?\nANSWER: C) Merge Sort\n\n5. Dijkstra algorithm is for?\nANSWER: B) Shortest path'
      },
      {
        name: 'exam_2021.txt', type: 'file', size: '8.9 KB', modified: '2021-06-18 14:30',
        content: 'ALGORITHMS EXAM - JUNE 2021\nProf. Czegniew Zbich\n\n1. Which of the following is a sorting algorithm?\nA) Bubble Sort\nB) Quick Sort\nC) Merge Sort\nD) All of the above\nANSWER: D\n\n2. What is the time complexity of the Binary Search algorithm?\nA) O(n)\nB) O(log n)\nC) O(n²)\nD) O(n log n)\nANSWER: B\n\n3. Which data structure works on a LIFO basis?\nA) Queue\nB) Stack\nC) Tree\nD) Graph\nANSWER: B\n\n4. Divide and conquer?\nANSWER: C) Merge Sort\n\n5. Dijkstra algorithm is for?\nANSWER: B) Shortest path\n\nIdentical questions...'
      },
      {
        name: 'exam_2020.txt', type: 'file', size: '8.5 KB', modified: '2020-06-15 16:00',
        content: 'ALGORITHMS EXAM - JUNE 2020\nProf. Czegniew Zbich\n\nTHE SAME AS ALWAYS!\n\n1. Which of the following is a sorting algorithm?\nANSWER: D) All of the above\n\n2. Binary Search complexity?\nANSWER: B) O(log n)\n\n3. LIFO to?\nANSWER: B) Stack\n\n4. Divide and conquer?\nANSWER: C) Merge Sort\n\n5. Dijkstra algorithm is for?\nANSWER: B) Shortest path\n\nThis questions DOES NOT CHANGE!'
      }
    ],
    '/electronic': [
      { name: '..', type: 'folder', modified: '' },
      {
        name: 'schemes.txt', type: 'file', size: '12.4 KB', modified: '2023-09-20 10:15',
        content: 'ELECTRONIC - basic schemes\n\n1. Voltage divider\n2. Operational amplifier\n3. Lowpass filter\n4. Oscillator\n\nOhm\'s law: U = I × R'
      }
    ],
    '/programming': [
      { name: '..', type: 'folder', modified: '' },
      {
        name: 'cpp_basics.txt', type: 'file', size: '25.1 KB', modified: '2023-09-18 16:45',
        content: 'C++ BASICS\n\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello World!" << endl;\n    return 0;\n}\n\nVariables:\nint, float, double, char, bool\n\nLoops:\nfor, while, do-while\n\nFunctions:\nvoid function() { ... }'
      }
    ],
    '/physics': [
      { name: '..', type: 'folder', modified: '' },
      {
        name: 'mechanics.txt', type: 'file', size: '18.7 KB', modified: '2023-09-12 09:20',
        content: 'MECHANICS - basic formulas\n\nKinematics:\nv = s/t\na = v/t\ns = v₀t + ½at²\n\nDynamics:\nF = ma\nP = mv\nE = ½mv²\n\nGravitation:\nF = G(m₁m₂)/r²'
      },
      {
        name: 'entropy.txt', type: 'file', size: '2.3 KB', modified: '2024-07-02 07:28',
        content: 'A measure of disorder or energy dissipation in a system'
      }

    ]
  }

  const getCurrentFiles = () => {
    return fileSystem[currentPath] || []
  }

  const handleItemClick = (item: FileItem) => {
    if (item.type === 'folder') {

      if (item.name === '..') {
        const pathParts = currentPath.split('/').filter(p => p)
        pathParts.pop()

        setCurrentPath('/' + pathParts.join('/'))
      } else {
        const newPath = currentPath === '/' ? `/${item.name}` : `${currentPath}/${item.name}`
        setCurrentPath(newPath)
      }

      setSelectedFile(null)
    } else {
      setSelectedFile(item)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-green-400 font-mono p-4">
      <div className="max-w-7xl mx-auto">
        <div className="border border-green-600 rounded-lg p-4 mb-4 bg-neutral-900">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-xl font-bold">📁 FTP Server - student.disk.polsl.pl</h1>
            <div className="text-sm">Connected as: anonymous</div>
          </div>
          <div className="text-sm text-green-300">
            Status: 230 Login successful. Current directory: {currentPath}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="border border-green-600 rounded-lg bg-neutral-900">
            <div className="bg-neutral-800 rounded-t-lg text-green-400 p-2 font-bold">
              📂 Directory Listing: {currentPath}
            </div>

            <div className="p-4">
              <div className="grid grid-cols-4 gap-2 text-xs font-bold border-b border-green-600 pb-2 mb-2">
                <div>Name</div>
                <div>Type</div>
                <div>Size</div>
                <div>Modified</div>
              </div>

              {getCurrentFiles().map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleItemClick(item)}
                  className="grid grid-cols-4 gap-2 text-xs py-1 hover:bg-green-900/30 cursor-pointer border-b border-green-800/50"
                >
                  <div className="flex items-center">
                    {item.type === 'folder' ? '📁' : '📄'} {item.name}
                  </div>
                  <div>{item.type}</div>
                  <div>{item.size || '-'}</div>
                  <div>{item.modified}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-green-600 rounded-lg bg-neutral-900">
            <div className="bg-neutral-800 text-green-500 p-2 rounded-t-lg font-bold flex justify-between">
              <span>📄 File Preview</span>
            </div>

            <div className="p-4 h-96 overflow-y-auto">
              {selectedFile ? (
                <div>
                  <div className="mb-4 text-green-300">
                    <strong>File:</strong> {selectedFile.name}<br />
                    <strong>Size:</strong> {selectedFile.size}<br />
                    <strong>Modified:</strong> {selectedFile.modified}
                  </div>
                  <hr className="border-green-600 mb-4" />
                  <pre className="text-green-400 text-sm whitespace-pre-wrap">
                    {selectedFile.content}
                  </pre>
                </div>
              ) : (
                <div className="text-center text-green-600 mt-20">
                  Select a file to preview
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="border border-green-600 rounded-lg p-2 mt-4 bg-neutral-900">
          <div className="text-xs">
            <span className="text-green-300">ftp&gt;</span> {currentPath}
            <span className="ml-4 text-green-600">
              A student not a camel, beer must drink.
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FTPDiskPage
