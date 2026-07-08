import React, { useEffect, useRef, useState } from 'react';
import { Video, VideoOff, Mic, MicOff, PhoneOff } from 'lucide-react';
import io from 'socket.io-client';
import Peer from 'simple-peer'; // You may need to run: npm install simple-peer

// Change this line to your actual tunnel address
const SOCKET_URL = "https://empirebusinessfamily.loca.lt";

export default function MeetingRoom() {
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    const socket = useRef<any>();
    const peerRef = useRef<any>();

    const [stream, setStream] = useState<MediaStream | null>(null);
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);

    useEffect(() => {
        // 1. Get Camera/Mic
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((mediaStream) => {
            setStream(mediaStream);
            if (localVideoRef.current) localVideoRef.current.srcObject = mediaStream;

            // 2. Connect to Empire Signaling Server
            socket.current = io(SOCKET_URL);
            socket.current.emit('join-room', 'empire-inner-circle');

            // 3. Handle Peer Connection
            socket.current.on('user-joined', (userId: string) => {
                callUser(userId, mediaStream);
            });

            socket.current.on('signal', (data: any) => {
                peerRef.current.signal(data.signal);
            });
        });

        return () => {
            stream?.getTracks().forEach(track => track.stop());
            socket.current?.disconnect();
        };
    }, []);

    const callUser = (id: string, mediaStream: MediaStream) => {
        const peer = new Peer({ initiator: true, trickle: false, stream: mediaStream });

        peer.on('signal', (data) => {
            socket.current.emit('signal', { to: id, signal: data });
        });

        peer.on('stream', (remoteStream) => {
            setRemoteStream(remoteStream);
            if (remoteVideoRef.current) remoteVideoRef.current.srcObject = remoteStream;
        });

        peerRef.current = peer;
    };

    const toggleMute = () => {
        if (stream) {
            stream.getAudioTracks()[0].enabled = isMuted;
            setIsMuted(!isMuted);
        }
    };

    const toggleVideo = () => {
        if (stream) {
            stream.getVideoTracks()[0].enabled = isVideoOff;
            setIsVideoOff(!isVideoOff);
        }
    };

    return (
        <div className="bg-black rounded-2xl overflow-hidden border border-gold/20 shadow-2xl max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-4 aspect-video bg-zinc-900">
                {/* Local Participant */}
                <div className="relative bg-zinc-800 rounded-xl overflow-hidden border border-white/10">
                    <video ref={localVideoRef} autoPlay muted playsInline className="w-full h-full object-cover scale-x-[-1]" />
                    <div className="absolute bottom-4 left-4 bg-black/50 px-3 py-1 rounded-full text-xs text-white">
                        You {isMuted && "(Muted)"}
                    </div>
                </div>

                {/* Remote Participant */}
                <div className="relative bg-zinc-800 rounded-xl flex items-center justify-center border border-white/10 overflow-hidden">
                    {remoteStream ? (
                        <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full object-cover" />
                    ) : (
                        <div className="text-zinc-500 text-sm animate-pulse">Waiting for teammate...</div>
                    )}
                    <div className="absolute bottom-4 left-4 bg-black/50 px-3 py-1 rounded-full text-xs text-white">
                        Empire Guest
                    </div>
                </div>
            </div>

            {/* Toolbar */}
            <div className="bg-zinc-950 p-6 flex items-center justify-center gap-6">
                <button onClick={toggleMute} className={`p-4 rounded-full transition-all ${isMuted ? 'bg-red-500 text-white' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'}`}>
                    {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
                </button>
                <button onClick={toggleVideo} className={`p-4 rounded-full transition-all ${isVideoOff ? 'bg-red-500 text-white' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'}`}>
                    {isVideoOff ? <VideoOff size={20} /> : <Video size={20} />}
                </button>
                <button className="p-4 bg-red-600 hover:bg-red-700 text-white rounded-full transition-all">
                    <PhoneOff size={20} />
                </button>
            </div>
        </div>
    );
}