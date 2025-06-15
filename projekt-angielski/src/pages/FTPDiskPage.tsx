import { useState } from 'react'
import { Button } from '@/components/ui/button'

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
  const [viewMode, setViewMode] = useState<'list' | 'preview'>('list')

  const fileSystem: { [key: string]: FileItem[] } = {
    '/': [
      { name: 'algorytmy', type: 'folder', modified: '2023-09-15 14:30' },
      { name: 'elektronika', type: 'folder', modified: '2023-09-20 10:15' },
      { name: 'programowanie', type: 'folder', modified: '2023-09-18 16:45' },
      { name: 'fizyka', type: 'folder', modified: '2023-09-12 09:20' },
      { name: 'readme.txt', type: 'file', size: '2.1 KB', modified: '2023-09-01 12:00', 
        content: 'Witaj na dysku studenckim!\n\nTutaj znajdziesz:\n- Notatki z wykładów\n- Archiwalne egzaminy\n- Rozwiązania zadań\n\nPowodzenia!\n- Administracja' }
    ],
    '/algorytmy': [
      { name: '..', type: 'folder', modified: '' },
      { name: 'egzaminy_archiwalne', type: 'folder', modified: '2023-09-15 14:30' },
      { name: 'notatki_wyklady', type: 'folder', modified: '2023-09-15 14:25' },
      { name: 'zadania_domowe', type: 'folder', modified: '2023-09-15 14:20' },
      { name: 'teoria_grafow.txt', type: 'file', size: '15.3 KB', modified: '2023-09-10 11:30',
        content: 'TEORIA GRAFÓW - notatki\n\nGraf to struktura składająca się z:\n- Wierzchołków (V)\n- Krawędzi (E)\n\nAlgorytmy grafowe:\n1. DFS - przeszukiwanie w głąb\n2. BFS - przeszukiwanie wszerz\n3. Dijkstra - najkrótsza ścieżka\n4. Kruskal - minimalne drzewo rozpinające\n\nZłożoności:\n- DFS/BFS: O(V + E)\n- Dijkstra: O((V + E) log V)\n- Kruskal: O(E log E)' }
    ],
    '/algorytmy/egzaminy_archiwalne': [
      { name: '..', type: 'folder', modified: '' },
      { name: 'egzamin_2022.txt', type: 'file', size: '8.7 KB', modified: '2022-06-20 15:00',
        content: 'EGZAMIN Z ALGORYTMÓW - CZERWIEC 2022\nProf. Zbigniew Czech\n\n1. Które z poniższych to algorytm sortowania?\nA) Bubble Sort\nB) Quick Sort\nC) Merge Sort\nD) Wszystkie powyższe\nODPOWIEDŹ: D\n\n2. Jaka jest złożoność czasowa algorytmu Binary Search?\nA) O(n)\nB) O(log n)\nC) O(n²)\nD) O(n log n)\nODPOWIEDŹ: B\n\n3. Która struktura danych działa na zasadzie LIFO?\nA) Queue\nB) Stack\nC) Tree\nD) Graph\nODPOWIEDŹ: B' },
      { name: 'egzamin_2021.txt', type: 'file', size: '8.9 KB', modified: '2021-06-18 14:30',
        content: 'EGZAMIN Z ALGORYTMÓW - CZERWIEC 2021\nProf. Zbigniew Czech\n\n1. Które z poniższych to algorytm sortowania?\nA) Bubble Sort\nB) Quick Sort\nC) Merge Sort\nD) Wszystkie powyższe\nODPOWIEDŹ: D\n\n2. Jaka jest złożoność czasowa algorytmu Binary Search?\nA) O(n)\nB) O(log n)\nC) O(n²)\nD) O(n log n)\nODPOWIEDŹ: B\n\n[...identyczne pytania...]' },
      { name: 'egzamin_2020.txt', type: 'file', size: '8.5 KB', modified: '2020-06-15 16:00',
        content: 'EGZAMIN Z ALGORYTMÓW - CZERWIEC 2020\nProf. Zbigniew Czech\n\nTE SAME PYTANIA CO ZAWSZE!\n\n1. Które z poniższych to algorytm sortowania?\nODPOWIEDŹ: D) Wszystkie powyższe\n\n2. Binary Search złożoność?\nODPOWIEDŹ: B) O(log n)\n\n3. LIFO to?\nODPOWIEDŹ: B) Stack\n\n4. Dziel i zwyciężaj?\nODPOWIEDŹ: C) Merge Sort\n\n5. Dijkstra to?\nODPOWIEDŹ: B) Najkrótsza ścieżka\n\nUWAGA: Te pytania się NIE ZMIENIAJĄ!' }
    ],
    '/elektronika': [
      { name: '..', type: 'folder', modified: '' },
      { name: 'schematy.txt', type: 'file', size: '12.4 KB', modified: '2023-09-20 10:15',
        content: 'ELEKTRONIKA - podstawowe schematy\n\n1. Dzielnik napięcia\n2. Wzmacniacz operacyjny\n3. Filtr dolnoprzepustowy\n4. Oscylator\n\nPrawo Ohma: U = I × R\nPrawo Kirchhoffa...' }
    ],
    '/programowanie': [
      { name: '..', type: 'folder', modified: '' },
      { name: 'cpp_basics.txt', type: 'file', size: '25.1 KB', modified: '2023-09-18 16:45',
        content: 'C++ PODSTAWY\n\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello World!" << endl;\n    return 0;\n}\n\nZmienne:\nint, float, double, char, bool\n\nPętle:\nfor, while, do-while\n\nFunkcje:\nvoid funkcja() { ... }' }
    ],
    '/fizyka': [
      { name: '..', type: 'folder', modified: '' },
      { name: 'mechanika.txt', type: 'file', size: '18.7 KB', modified: '2023-09-12 09:20',
        content: 'MECHANIKA - wzory podstawowe\n\nKinematyka:\nv = s/t\na = v/t\ns = v₀t + ½at²\n\nDynamika:\nF = ma\nP = mv\nE = ½mv²\n\nGrawita​cja:\nF = G(m₁m₂)/r²' }
    ]
  }

  const getCurrentFiles = () => {
    return fileSystem[currentPath] || []
  }

  const handleItemClick = (item: FileItem) => {
    if (item.type === 'folder') {
      if (item.name === '..') {
        // Go back
        const pathParts = currentPath.split('/').filter(p => p)
        pathParts.pop()
        setCurrentPath('/' + pathParts.join('/'))
      } else {
        // Enter folder
        const newPath = currentPath === '/' ? `/${item.name}` : `${currentPath}/${item.name}`
        setCurrentPath(newPath)
      }
      setSelectedFile(null)
      setViewMode('list')
    } else {
      // File selected
      setSelectedFile(item)
      setViewMode('preview')
    }
  }

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-4">
      <div className="max-w-7xl mx-auto">
        {/* FTP Header */}
        <div className="border border-green-600 rounded p-4 mb-4 bg-gray-900">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-xl font-bold">📁 FTP Server - student.disk.polsl.pl</h1>
            <div className="text-sm">Connected as: anonymous</div>
          </div>
          <div className="text-sm text-green-300">
            Status: 230 Login successful. Current directory: {currentPath}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* File List */}
          <div className="border border-green-600 rounded bg-gray-900">
            <div className="bg-green-900 text-black p-2 font-bold">
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

          {/* File Preview */}
          <div className="border border-green-600 rounded bg-gray-900">
            <div className="bg-green-900 text-black p-2 font-bold flex justify-between">
              <span>📄 File Preview</span>
              {selectedFile && (
                <Button
                  onClick={() => setViewMode('list')}
                  className="bg-green-700 hover:bg-green-600 text-black text-xs px-2 py-1"
                >
                  ✕ Close
                </Button>
              )}
            </div>
            
            <div className="p-4 h-96 overflow-y-auto">
              {selectedFile ? (
                <div>
                  <div className="mb-4 text-green-300">
                    <strong>File:</strong> {selectedFile.name}<br/>
                    <strong>Size:</strong> {selectedFile.size}<br/>
                    <strong>Modified:</strong> {selectedFile.modified}
                  </div>
                  <hr className="border-green-600 mb-4"/>
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

        {/* Terminal Footer */}
        <div className="border border-green-600 rounded p-2 mt-4 bg-gray-900">
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
