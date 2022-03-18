window.app_saku3_transaksi_investasi_invest2_fDepoEdit = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_investasi_invest2_fDepoEdit.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_investasi_invest2_fDepoEdit";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Edit Data DOC/Deposito", 0);	
				
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.cb_bank = new saiCBBL(this,{bound:[20,18,222,20],caption:"Bank Deposito", multiSelection:false, maxLength:10, tag:1,change:[this,"doLoad"]});						
		this.pc2 = new pageControl(this,{bound:[10,10,1000,440], childPage:["List Deposito","Detail"]});		
		this.sg = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:8,tag:9,				
				colTitle:["No Deposito","Keterangan","Tgl Mulai","JthTempo","No Bilyet","Bank Depo","Nama Bank","Nominal"],
				colWidth:[[7,6,5,4,3,2,1,0],[100,220,60,100,80,80,220,100]],
				columnReadOnly:[true,[0,1,2,3,4,5,6,7],[]],
				colFormat:[[7],[cfNilai]],
				dblClick:[this,"doDoubleClick"],defaultRow:1,autoAppend:false});
		this.sgn = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[0,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg});				
		
		this.e_nodepo = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,11,200,20],caption:"No Deposito", readOnly:true});				
		this.e_ket = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,12,450,20],caption:"Keterangan", readOnly:true});				
		this.e_tglawal = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,13,200,20],caption:"Tgl Mulai", readOnly:true});				
		this.e_tglakhir = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,14,200,20],caption:"Tgl Selesai", readOnly:true});						
		this.e_bilyet = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,15,200,20],caption:"No Bilyet", maxLength:50});								
		this.cb_bdepo = new saiCBBL(this.pc2.childPage[1],{bound:[20,16,220,20],caption:"Bank Deposito", readOnly:true});				
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,17,200,20],caption:"Nilai", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		
		this.e_file = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,15,450,20],caption:"File", readOnly:true, tag:8});		
		this.uploader = new uploader(this.pc2.childPage[1],{bound:[480,15,80,18],caption:"Browse File", param1:"uploadTo",param2:"server/media/tmp/",param3:"object",param4:"server/media/",autoSubmit:true, afterUpload:[this,"doAfterLoad"]});				
		this.bLihat = new button(this.pc2.childPage[1],{bound:[580,15,80,18],caption:"Download File",click:[this,"doLihat"]});			
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[1].rearrangeChild(10, 23);	
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		
		this.rootDir = this.app._rootDir;
		this.fileUtil = new util_file();
		this.fileUtil.addListener(this);
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
						
			this.cb_bank.setSQL("select kode_bank, nama+' - '+no_rek as nama from inv_bank",["kode_bank","nama"],false,["Kode","Nama"],"where","Daftar Bank",true);
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_investasi_invest2_fDepoEdit.extend(window.childForm);
window.app_saku3_transaksi_investasi_invest2_fDepoEdit.implement({
	doLihat: function(sender){
		try{
			if (this.e_file.getText() != "" || this.e_file.getText() != "-") window.open("server/media/"+this.e_file.getText());
		}catch(e){
			alert(e);
		}
	},
	doAfterLoad:  function(sender, result, data, filename){
		try{
			if (result) this.e_file.setText(data.filedest);
			this.dataUpload = data;
			if (this.dataUpload.temporary !== undefined) this.dataUpload.temporary += ";";
			else this.dataUpload.temporary = "";
			this.dataUpload.temporary += this.rootDir+"/"+this.uploader.param2 +this.dataUpload.tmpfile;
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick: function(sender,col,row) {		
		try{
			this.pc2.setActivePage(this.pc2.childPage[1]);
			this.e_nodepo.setText(sender.cells(0,row));
			this.e_ket.setText(sender.cells(1,row));
			this.e_tglawal.setText(sender.cells(2,row));
			this.e_tglakhir.setText(sender.cells(3,row));
			this.e_bilyet.setText(sender.cells(4,row));
			this.cb_bdepo.setText(sender.cells(5,row));
			this.e_nilai.setText(sender.cells(7,row));
			
			var data = this.dbLib.getDataProvider("select isnull(no_gambar,'') as no_gambar   "+
					   "from inv_dok "+					   
					   "where no_bukti='"+this.e_nodepo.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul = 'DEPOSITO' ",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.e_file.setText(line.no_gambar);
					this.fileBfr = line.no_gambar;
				} 
			}
			
		}
		catch(e) {alert(e);}
	},
	mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
		if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");	
		if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");	
		if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");	
	},
	simpan: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from inv_dok where no_bukti = '"+this.e_nodepo.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("update inv_depo2_m set no_bilyet='"+this.e_bilyet.getText()+"' where no_depo='"+this.e_nodepo.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");							
					sql.add("insert into inv_dok(no_bukti,modul,no_gambar,kode_lokasi) values ('"+this.e_nodepo.getText()+"','DEPOSITO','"+this.e_file.getText()+"','"+this.app._lokasi+"')");
					
					setTipeButton(tbAllFalse);					
					this.dbLib.execArraySQL(sql);
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1","8"),this.e_nb);					
					this.sg.clear(1); 
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.sg.validasi();
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
		}
	},		
	doLoad:function(sender){
		if (this.cb_bank.getText()!="") {
			var strSQL = "select a.no_depo,convert(varchar,a.tgl_mulai,103) as mulai,convert(varchar,a.tgl_selesai,103) as selesai,a.keterangan,a.bdepo,b.nama as nama_bank,a.nilai,a.no_bilyet "+
			             "from inv_depo2_m a inner join inv_bank b on a.bdepo=b.kode_bank where a.kode_lokasi = '"+this.app._lokasi+"' and a.bdepo='"+this.cb_bank.getText()+"' order by a.tgl_mulai";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.no_depo,line.keterangan,line.mulai,line.selesai,line.no_bilyet,line.bdepo,line.nama_bank,floatToNilai(line.nilai)]);
				}
			} else this.sg.clear(1);			
		}
		else {
			system.alert(this,"Data tidak valid.","Bank harus diisi.");
		}
	},					
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1) {
							if (this.fileBfr && this.dataUpload) {
								if (this.fileBfr != this.e_file.getText()) this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.fileBfr);
							}									
							if (this.dataUpload) this.fileUtil.copyFileTo(this.rootDir+"/"+this.uploader.param2+this.dataUpload.tmpfile,this.rootDir+"/"+this.uploader.param4+this.dataUpload.filedest);
							
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;					
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});