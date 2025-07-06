import { Button, H3, XStack, YStack } from 'tamagui'
import { Menu, Search, Bell, User } from '@tamagui/lucide-icons'

export interface TopBarProps {
  title?: string
  onMenuPress?: () => void
  showSearch?: boolean
  showNotifications?: boolean
  showProfile?: boolean
}

export function TopBar({ 
  title = 'BreakLog', 
  onMenuPress,
  showSearch = true,
  showNotifications = true,
  showProfile = true 
}: TopBarProps) {
  return (
    <XStack
      backgroundColor="$background"
      borderBottomWidth={1}
      borderBottomColor="$borderColor"
      paddingHorizontal="$4"
      paddingVertical="$3"
      alignItems="center"
      justifyContent="space-between"
      elevation={2}
      shadowColor="$shadowColor"
      shadowOffset={{ width: 0, height: 2 }}
      shadowOpacity={0.1}
      shadowRadius={4}
    >
      {/* Left side - Menu and Title */}
      <XStack alignItems="center" gap="$3" flex={1}>
        <Button
          size="$3"
          variant="ghost"
          icon={Menu}
          onPress={onMenuPress}
          borderRadius="$2"
          pressStyle={{ opacity: 0.7 }}
        />
        <H3 color="$color12" fontWeight="600" fontSize="$6">
          {title}
        </H3>
      </XStack>

      {/* Right side - Actions */}
      <XStack alignItems="center" gap="$2">
        {showSearch && (
          <Button
            size="$3"
            variant="ghost"
            icon={Search}
            borderRadius="$2"
            pressStyle={{ opacity: 0.7 }}
          />
        )}
        {showNotifications && (
          <Button
            size="$3"
            variant="ghost"
            icon={Bell}
            borderRadius="$2"
            pressStyle={{ opacity: 0.7 }}
          />
        )}
        {showProfile && (
          <Button
            size="$3"
            variant="ghost"
            icon={User}
            borderRadius="$2"
            pressStyle={{ opacity: 0.7 }}
          />
        )}
      </XStack>
    </XStack>
  )
}