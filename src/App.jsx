import { useState, useEffect } from 'react'
import './App.css'


function App() {
  const [selectedImages, setSelectedImages] = useState("000000000000000000000")
  const [currentTime, setCurrentTime] = useState('')
  const [showVideo, setShowVideo] = useState(false)
  const totalImages = 21

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      let hours = now.getHours()
      const minutes = now.getMinutes()
      const ampm = hours >= 12 ? 'PM' : 'AM'
      
      hours = hours % 12
      hours = hours ? hours : 12 
      
      const timeString = `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`
      setCurrentTime(timeString)
    }
    
    updateTime()
    

    const interval = setInterval(updateTime, 60000)
    
    return () => clearInterval(interval)
  }, [])



  const handleImageSelect = (id) => {
    const selectedArray = selectedImages.split('');
    const index = id - 1;
    selectedArray[index] = selectedArray[index] === '0' ? '1' : '0';
    setSelectedImages(selectedArray.join(''));
  }

  const handleRecycleBinClick = () => {
    setShowVideo(true)
  }

  const closeVideo = () => {
    setShowVideo(false)
  }

  const handleSubmit = async () => {
    try {
      alert('Images successfully submitted! Waiting for results...')
      const response = await fetch('https://truthlensback.onrender.com/zklens', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        mode: "cors",
        body: JSON.stringify({ 
          selectedImages
        }),
      })
      
      setSelectedImages("000000000000000000000")
      if (response.ok) {
        alert('Results received!')
        const data = await response.json()
        // const cleanedHex = data.score.replace(/0+$/, ""); 
        // const parsedInt = parseInt(cleanedHex, 16); 
        const parsedInt = data.score
        alert(`Your score is ${parsedInt}`)
      } else {
        alert('Failed to submit selected images')
      }
    } catch (error) {
      console.error('Error submitting images:', error)
      alert('Error submitting images')
    }
  }

  const selectedCount = selectedImages.split('').filter(bit => bit === '1').length;

  return (
    <div className="win95-desktop pink-theme">
      <div className="win95-container">
        <div className="win95-titlebar">
          <div className="win95-titlebar-text">Truthlens.exe</div>
          <div className="win95-titlebar-controls">
            <button className="win95-button win95-minimize">_</button>
            <button className="win95-button win95-maximize">□</button>
            <button className="win95-button win95-close">×</button>
          </div>
        </div>
        
        <div className="win95-menu">
          <div className="win95-menu-item">File</div>
          <div className="win95-menu-item">Edit</div>
          <div className="win95-menu-item">Help</div>
        </div>
        
        <div className="win95-content">
          <div className="win95-header">
            <img src="https://win98icons.alexmeub.com/icons/png/search_file-0.png" alt="Truthlens icon" className="win95-icon" />
            <h1 className="win95-title">Select AI Generated Images</h1>
          </div>
          
          <div className="win95-infobar">
            <div className="win95-infobar-text">
              Selected {selectedCount} of {totalImages} images
            </div>
          </div>
          
          <div className="win95-grid">
            {Array.from({ length: totalImages }).map((_, index) => {
              const id = index + 1
              const isSelected = selectedImages[index] === '1'
              
              return (
                <div 
                  key={id}
                  onClick={() => handleImageSelect(id)}
                  className={`win95-grid-item ${isSelected ? 'win95-selected' : ''}`}
                  style={{ padding: '5px' }}
                >
                  <div 
                    className="win95-image-container"
                    style={{ 
                      position: 'relative',
                      width: '100%',
                      height: '130px'
                    }}
                  >
                    <img 
                      src={`/pics/${id}.png`}
                      alt={`Image ${id}`}
                      className="win95-image"
                      style={{ 
                        width: '100%',
                        height: '100%',
                        objectFit: 'fill'
                      }}
                    />
                    <div 
                      className="win95-image-number"
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'rgba(0,0,0,0.4)',
                        color: 'white',
                        fontSize: '32px',
                        fontWeight: 'bold',
                        padding: '2px 10px',
                        borderRadius: '3px',
                        textShadow: '1px 1px 2px black',
                        fontFamily: 'Arial, sans-serif',
                        lineHeight: '1',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minWidth: '40px',
                        textAlign: 'center'
                      }}
                    >{id}</div>
                  </div>
                </div>
              )
            })}
          </div>
          
          <div className="mt-3 flex justify-center">
            <button
              onClick={handleSubmit}
              disabled={selectedCount === 0}
              className="win95-submit-button"
            >
              Submit Selected
            </button>
          </div>
        </div>
      </div>
      
      {showVideo && (
        <div className="win95-modal">
          <div className="win95-modal-container win95-video-container">
            <div className="win95-titlebar">
              <div className="win95-titlebar-text">Recycle Bin Contents</div>
              <div className="win95-titlebar-controls">
                <button className="win95-button win95-close" onClick={closeVideo}>×</button>
              </div>
            </div>
            <div className="win95-modal-content">
              <div className="win95-video-wrapper">
                <video 
                  src="bruh.mp4" 
                  autoPlay 
                  loop 
                  controls={false} 
                  className="win95-video"
                />
              </div>
              <div className="win95-modal-footer">
                <button className="win95-submit-button" onClick={closeVideo}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="win95-desktop-icons">
        <div className="win95-desktop-icon" onClick={handleRecycleBinClick}>
          <img src="https://win98icons.alexmeub.com/icons/png/recycle_bin_full-0.png" alt="Recycle Bin" />
          <div>Recycle Bin</div>
        </div>
      </div>
      
      <div className="win95-taskbar">
        <button className="win95-start-button">
          <img src="https://win98icons.alexmeub.com/icons/png/windows-0.png" alt="Start" />
          Start
        </button>
        <div className="win95-taskbar-divider"></div>
        <div className="win95-taskbar-item active">Truthlens.exe</div>
        <div className="win95-taskbar-right">
          <div className="win95-time">{currentTime}</div>
        </div>
      </div>
    </div>
  )
}

export default App
