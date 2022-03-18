window.app_rra_fCompose = function(owner,options)
{
	if (owner)
	{
		window.app_rra_fCompose.prototype.parent.constructor.call(this,owner,options);
		this.className  = "app_rra_fCompose";
		this.itemsValue = new arrayList();				
		try {			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.to = new saiCBBL(this,{bound:[10,10,200,20], caption:"Kepada", multiSelection:false, tag:10,
				sql :["select nik, nama from rra_karyawan where kode_lokasi = '"+this.app._lokasi+"' ",["nik","nama"],false, ["NIK","Nama"],"and","Daftar Karyawan",true]				
			});						
			this.bAttach = new button(this, {bound:[this.width - 210,10,80,20], caption:"Attachment", click:[this,"doAttachment"]});			
			this.bSend = new button(this, {bound:[this.width - 110,10,80,20], caption:"Send", click:[this,"doClick"]});			
			this.subjek = new saiLabelEdit(this,{bound:[10,11,this.width - 30,20], caption:"Subyek",tag:11});						
			this.pdrk = new saiCBBL(this,{bound:[10,13,300,20], caption:"PDRK",tag:11, multiSelection:false,
				sql :["select no_pdrk, keterangan from rra_pdrk_m where kode_lokasi = '"+this.app._lokasi+"'  and flag_rfc < '2' ",["no_pdrk","keterangan"],false, ["No PDRK","Keterangan"],"and","Daftar PDRK",true]				
			});												
			this.editor = new tinymceCtrl(this,{bound:[10,12,this.width - 30,this.height - 100],tag:11});						
			this.rearrangeChild(10,23);			
			this.pAttach = new panel(this,{bound:[10,this.editor.top + 80,this.width - 30, this.editor.height - 80], caption:"Attachment", visible:false});						
			this.grid = new saiGrid(this.pAttach, {bound:[10,25,this.pAttach.width - 30, this.pAttach.height - 60], colCount:3,colTitle:["File","Browse","Deskrisi"], colFormat:[[1],[cfUpload]],
					colWidth:[[2,1,0],[250,80,230]], colReadOnly:[true,[0,1],[]], change:[this,"doGridChange"], tag:11, rowCount:1
			});			
			this.grid.setUploadParam([1],"uploadTo", "server/media/tmp/"+this.app._userLog+"_", "object","server/media/");
			this.sgn = new sgNavigator(this.pAttach,{bound:[1,this.pAttach.height - 25,this.pAttach.width-3,25],buttonStyle:1, grid:this.grid});
			this.pAttach.hide();												
		}catch(e){
			system.alert(this,e,"");
		}
	}
};
window.app_rra_fCompose.extend(window.frame);
window.app_rra_fCompose.implement({			
	doAttachment :function (sender){				
		this.pAttach.setVisible(!this.pAttach.visible);
	},
	doGridChange: function(sender, col, row,param1,result, data){
	    try{			
        	if (sender == this.grid && col == 1){ 
				if (this.uploadedFiles == undefined) this.uploadedFiles = "";
				if (this.uploadedFiles != "") this.uploadedFiles +=";";
				this.uploadedFiles+= this.rootDir+"/"+this.grid.columns.get(1).param2 + data.tmpfile;
                this.grid.cells(0,row, data.filedest);
            }
         }catch(e){
            alert(e+" "+data);
         }
    },
	doClick: function(sender){
		if (sender == this.bSend){
			this.dbLib.execArraySQL(new server_util_arrayList({items:[
				"insert into rra_pesan(no_pesan, kode_lokasi, tanggal, pengirim, penerima, judul, keterangan, periode, flag_email, nik_user, tgl_input, flag_read, flag_sms, no_dokumen) values "+
				" ('"+new Date().valueOf()+"', '"+this.app._lokasi+"', now(), '"+this.app._userLog+"','"+this.to.getText()+"', "+
				" '"+this.subjek.getText()+"','"+urlencode(this.editor.getCode())+"', '"+new Date().getThnBln()+"', '0','"+this.app._userLog+"',now(),0,0,'"+this.pdrk.getText()+"')"
			]}));
		}
	},
	doRequestReady: function(sender, methodName, result, errCode, connection, status){	
		
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							system.info(this,"Pesan terkirim ke "+ this.to.getText(),"");
							this.to.clear();
							this.subjek.clear();
							this.editor.setCode("<br>");
							this.dataProvider2.setShareValue("MSG",this.app._userLog+","+this.app._lokasi);
							this.hide();
						}else system.alert(this,result,"");
	    			break;
	      		break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }	    
	},	
	eventMouseScrollDown: function(event){
		this.scrollDown = true;
		this.scrollPos = {x:0, y:event.clientY};				
		system.addMouseListener(this);
	},
	eventMouseScrollDown2: function(event){
				
	},
	eventMouseScrollUp: function(event){
		system.delMouseListener(this);
		this.scrollDown = false;
	},
	doSysMouseUp: function(x, y , button, buttonState){
		system.delMouseListener(this);
		this.scrollDown = false;
		system.showHint(x,y,"this.scrollDown",true);
	},
	doSysMouseMove: function(x, y , button, buttonState){
		try{			
			var pos = {x:x, y:y};
			
			if (this.scrollDown){										
				var top = parseFloat(this.msgBoard.scroll.style.top) + (pos.y - this.scrollPos.y);
				var areaHeight = parseFloat(this.cnvInfo.offsetHeight) - parseFloat(this.msgBoard.scroll.style.height);
				var cTop = (top * (parseFloat(this.cnvInfo.scrollHeight) - parseFloat(this.cnvInfo.offsetHeight) )) / areaHeight;
				if (top + parseFloat(this.msgBoard.scroll.style.height) > parseFloat(this.cnvInfo.offsetHeight))
				{
					top = parseFloat(this.cnvInfo.offsetHeight) - parseFloat(this.msgBoard.scroll.style.height);
					cTop = parseFloat(this.cnvInfo.scrollHeight) - parseFloat(this.cnvInfo.offsetHeight);
				}	
				if (top < 0){
					top = 0;
					cTop = 0;
				}
				this.msgBoard.scroll.style.top = top;
				this.scrollPos.y = pos.y;									
				this.cnvInfo.scrollTop = cTop;				
			}	
			
		}catch(e){
			alert(e);
		}
	},	
	eventMouseScrollUp: function(event){
		this.scrollDown = false;		
	}	
});
