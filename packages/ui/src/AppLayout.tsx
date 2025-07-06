import { useState } from 'react'
import { XStack, YStack, useMedia } from 'tamagui'
import { TopBar } from './TopBar'
import { Sidebar } from './Sidebar'
import { Platform } from 'react-native'

export interface AppLayoutProps {
  children: React.ReactNode
  title?: string
}

export function AppLayout({ children, title }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const media = useMedia()
  
  // On larger screens, show sidebar by default
  const isLargeScreen = media.gtMd
  const showSidebar = isLargeScreen || sidebarOpen

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const closeSidebar = () => {
    setSidebarOpen(false)
  }

  return (
    <YStack flex={1} backgroundColor="$background">
      {/* Top Bar */}
      <TopBar 
        title={title}
        onMenuPress={toggleSidebar}
      />
      
      {/* Main Content Area */}
      <XStack flex={1}>
        {/* Sidebar - Hidden on mobile unless opened */}
        {showSidebar && (
          <>
            {/* Sidebar */}
            <YStack
              width={isLargeScreen ? 280 : '100%'}
              height="100%"
              position={isLargeScreen ? 'relative' : 'absolute'}
              top={0}
              left={0}
              zIndex={isLargeScreen ? 1 : 1000}
              animation="quick"
              enterStyle={{ 
                x: -280,
                opacity: 0 
              }}
              exitStyle={{ 
                x: -280,
                opacity: 0 
              }}
            >
              <Sidebar 
                isOpen={showSidebar}
                onClose={closeSidebar}
              />
            </YStack>
            
            {/* Mobile Overlay */}
            {!isLargeScreen && sidebarOpen && (
              <YStack
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                backgroundColor="$color1"
                opacity={0.5}
                zIndex={999}
                onPress={closeSidebar}
                animation="quick"
                enterStyle={{ opacity: 0 }}
                exitStyle={{ opacity: 0 }}
              />
            )}
          </>
        )}
        
        {/* Main Content */}
        <YStack
          flex={1}
          backgroundColor="$background"
          marginLeft={isLargeScreen && showSidebar ? 0 : 0}
        >
          {children}
        </YStack>
      </XStack>
    </YStack>
  )
}