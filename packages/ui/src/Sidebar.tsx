import { Button, H4, Paragraph, Separator, XStack, YStack } from 'tamagui'
import { Home, User, Settings, BookOpen, Calendar, ChevronRight } from '@tamagui/lucide-icons'
import { useLink } from 'solito/navigation'

export interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

interface NavItem {
  id: string
  label: string
  icon: any
  href: string
  description?: string
}

const navItems: NavItem[] = [
  {
    id: 'home',
    label: 'Home',
    icon: Home,
    href: '/',
    description: 'Dashboard and overview'
  },
  {
    id: 'user',
    label: 'Profile',
    icon: User,
    href: '/user/profile',
    description: 'User profile and settings'
  },
  {
    id: 'logs',
    label: 'Break Logs',
    icon: BookOpen,
    href: '/logs',
    description: 'View and manage break logs'
  },
  {
    id: 'schedule',
    label: 'Schedule',
    icon: Calendar,
    href: '/schedule',
    description: 'Break schedule and reminders'
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    href: '/settings',
    description: 'App preferences and configuration'
  }
]

export function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  return (
    <YStack
      backgroundColor="$background"
      borderRightWidth={1}
      borderRightColor="$borderColor"
      width={280}
      height="100%"
      padding="$4"
      gap="$4"
      elevation={3}
      shadowColor="$shadowColor"
      shadowOffset={{ width: 2, height: 0 }}
      shadowOpacity={0.1}
      shadowRadius={8}
    >
      {/* Header */}
      <YStack gap="$2" paddingBottom="$2">
        <H4 color="$color12" fontWeight="700">
          Navigation
        </H4>
        <Paragraph color="$color10" fontSize="$3">
          Navigate through your break tracking app
        </Paragraph>
      </YStack>

      <Separator />

      {/* Navigation Items */}
      <YStack gap="$1" flex={1}>
        {navItems.map((item) => (
          <NavItem key={item.id} item={item} onPress={onClose} />
        ))}
      </YStack>

      {/* Footer */}
      <YStack gap="$2" paddingTop="$2">
        <Separator />
        <Paragraph color="$color8" fontSize="$2" textAlign="center">
          BreakLog v1.0.0
        </Paragraph>
      </YStack>
    </YStack>
  )
}

function NavItem({ item, onPress }: { item: NavItem; onPress?: () => void }) {
  const linkProps = useLink({ href: item.href })
  
  return (
    <Button
      {...linkProps}
      onPress={() => {
        linkProps.onPress?.()
        onPress?.()
      }}
      variant="ghost"
      justifyContent="flex-start"
      height="auto"
      paddingVertical="$3"
      paddingHorizontal="$3"
      borderRadius="$3"
      pressStyle={{ 
        backgroundColor: '$color3',
        scale: 0.98
      }}
      hoverStyle={{ 
        backgroundColor: '$color2' 
      }}
    >
      <XStack alignItems="center" gap="$3" flex={1}>
        <item.icon size="$1.5" color="$color11" />
        <YStack flex={1} alignItems="flex-start">
          <Paragraph color="$color12" fontWeight="500" fontSize="$4">
            {item.label}
          </Paragraph>
          {item.description && (
            <Paragraph color="$color10" fontSize="$2" lineHeight="$1">
              {item.description}
            </Paragraph>
          )}
        </YStack>
        <ChevronRight size="$1" color="$color8" />
      </XStack>
    </Button>
  )
}