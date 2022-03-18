window.app_eclaim3_transaksi_fProgressE = function(owner)
{
	if (owner)
	{
		window.app_eclaim3_transaksi_fProgressE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_eclaim3_transaksi_fProgressE";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Progress Pekerjaan: Edit", 0);	
				
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		this.e_nb = new saiCBBL(this,{bound:[20,12,223,20],caption:"No Progress", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});		
		
		this.pc1 = new pageControl(this,{bound:[20,18,980,470], childPage:["Detail Klaim","Histori"]});
		this.e_noklaim = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,450,20],caption:"No Klaim", readOnly:true});
		this.e_tglklaim = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,14,450,20],caption:"Tanggal Klaim", readOnly:true});				
		this.e_nopolis = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,450,20],caption:"No Polis", readOnly:true});		
		this.e_nodok = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,15,450,20],caption:"Dok. Klaim", readOnly:true});
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,200,20],caption:"Nilai Estimasi", readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_tgldok = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,16,450,20],caption:"Tanggal Dok", readOnly:true});		
		this.e_lokasi = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,450,20],caption:"Lok. Kejadian", readOnly:true});
		this.e_loker = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,17,450,20],caption:"Loker", readOnly:true});		
		this.e_sebab = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,18,450,20],caption:"Penyebab", readOnly:true});
		this.e_objek = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,18,450,20],caption:"Objek", readOnly:true});		
		this.e_pic = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,19,450,20],caption:"Contact Person", readOnly:true});
		this.e_tel = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,19,450,20],caption:"No Telpon", readOnly:true});		
		this.e_memo = new saiMemo(this.pc1.childPage[0],{bound:[20,20,450,80],caption:"Keterangan",tag:9});
		
		this.l_label = new portalui_label(this.pc1.childPage[0],{bound:[20,21,100,18],caption:"Data", underline:true});
		this.sgUpld = new saiGrid(this.pc1.childPage[0],{bound:[121,21,848,200],colCount:6,
				      colTitle:["Kode Vendor","Nama Vendor","No Dokumen","Tgl Dokumen","Dokumen","Upload"],
					  columnReadOnly:[true,[0,1,5],[2,3,4]],
					  colFormat:[[5],[cfUpload]],
					  colWidth:[[5,4,3,2,1,0],[80,250,100,150,150,80]], buttonStyle:[[0,3],[bsEllips,bsDate]], 
					  ellipsClick:[this,"doEllipsClick"],change:[this,"doGridChange"], rowCount:1});
		this.sgUpld.setUploadParam([5],"uploadTo", "server/media/", "object","server/media/");	
		this.sgnUpld = new sgNavigator(this.pc1.childPage[0],{bound:[121,this.pc1.height - 25,850,25],buttonStyle:1, grid:this.sgUpld});
		
		this.sgUpld2 = new saiGrid(this.pc1.childPage[1],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:7,tag:9,
				      colTitle:["Kode Vendor","Nama Vendor","Jenis Dok","No Dokumen","Tanggal","Keterangan","Dokumen"],
					  readOnly:true, colWidth:[[6,5,4,3,2,1,0],[200,250,80,120,60,150,80]],
					  autoAppend:false,defaultRow:1});		
		this.sgnUpld2 = new sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sgUpld2});
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);	
					
		setTipeButton(tbUbahHapus);
		this.maximize();		
		this.setTabChildIndex();		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";				
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_eclaim3_transaksi_fProgressE.extend(window.childForm);
window.app_eclaim3_transaksi_fProgressE.implement({
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
					sql.add("delete from tlk_progress where no_progress='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from tlk_progress_dok where no_progress='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");														
					if (this.progLama == "7") this.progress = "6"; 
					if (this.progLama == "6") {if (this.notesting == "-") this.progress = "3"; else this.progress = "5"; }				
					sql.add("update tlk_klaim set progress='"+this.progress+"' where no_klaim='"+this.e_noklaim.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update tlk_progress set no_seb='-' where no_seb='"+this.e_nb.getText()+"' and no_klaim='"+this.e_noklaim.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					
					if (this.progress == "3") { var prog = "6"; var status = "SPPH";}
					if (this.progress == "5") { var prog = "6"; var status = "SPPH";}
					if (this.progress == "6") { var prog = "7"; var status = "SPH";}
					
					sql.add("update tlk_klaim set progress='"+prog+"' where no_klaim='"+this.e_noklaim.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("update tlk_progress set no_seb='"+this.e_nb.getText()+"' where no_klaim='"+this.e_noklaim.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and no_seb='-'");
					sql.add("insert into tlk_progress (no_progress,tanggal,kode_lokasi,periode,nik_user,tgl_input,status,modul,host,ip,no_klaim,catatan,no_seb) values "+
						    "('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',now(),'"+status+"','PROGRESS','"+this.app._hostname+"','"+this.app._iphost+"','"+this.e_noklaim.getText()+"','"+this.e_memo.getText()+"','-')");
										
					var ix=0;
					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i)){
							ix++;
							sql.add("insert into tlk_progress_dok (no_progress,no_file,nu,kode_lokasi,kode_vendor,no_dokumen,tgl_dok) values "+
							       "('"+this.e_nb.getText()+"','"+this.sgUpld.cells(5,i).filedest+"','"+ix+"','"+this.app._lokasi+"','"+this.sgUpld.cells(0,i)+"','"+this.sgUpld.cells(2,i)+"','"+this.sgUpld.getCellDateValue(3,i)+"')");
						}	
					}
					for (var i in this.listFiles.objList) {
						var ketemu = false;
						for (var j=0;j < this.sgUpld.getRowCount();j++){
							ketemu = i == this.sgUpld.cells(4,j);
							if (ketemu) break;
						}
						if (!ketemu) this.deletedFiles += this.rootDir+"/"+this.sgUpld.columns.get(1).param2 + i;
					}
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);					
					this.sgUpld.clear(1); this.sgUpld2.clear(1);	
					this.pc1.setActivePage(this.pc1.childPage[0]);						
					this.e_memo.setText("-");
					setTipeButton(tbUbahHapus);
				break;
			case "ubah" :									
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai Estimasi tidak boleh nol atau kurang.");
					return false;						
				}				
				else
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "hapus" :					
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();								
				sql.add("delete from tlk_progress where no_progress='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from tlk_progress_dok where no_progress='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");														
				if (this.progLama == "7") this.progress = "6"; 
				if (this.progLama == "6") {if (this.notesting == "-") this.progress = "3"; else this.progress = "5"; }								
				sql.add("update tlk_klaim set progress='"+this.progress+"' where no_klaim='"+this.e_noklaim.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("update tlk_progress set no_seb='-' where no_seb='"+this.e_nb.getText()+"' and no_klaim='"+this.e_noklaim.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
				this.deletedFiles = "";	
				for (var i in this.listFiles.objList) {
					this.deletedFiles += this.rootDir+"/"+this.sgUpld.columns.get(1).param2 + i;
				}
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);				
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y+""+m);
		}
	},		
	doChange:function(sender){	
		if (sender == this.e_periode && this.e_periode.getText() != "") {										 							
			this.e_nb.setSQL("select max(b.no_progress) as no_progress, b.no_klaim from tlk_progress b inner join tlk_klaim a on a.no_klaim=b.no_klaim and a.kode_lokasi=b.kode_lokasi "+
			                 "where a.progress in ('6','7') and b.periode<='"+this.e_periode.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"' group by b.no_klaim",["no_progress","no_klaim"],false,["No Progress","No Klaim"],"and","Daftar Bukti",true);
		}
		if (sender == this.e_nb && this.e_nb.getText()!="") {										    
			var strSQL = "select a.no_klaim,convert(varchar,a.tanggal,103) as tanggal,case a.progress when '6' then 'SPPH' when '7' then 'SPH' end as status,a.progress "+
						 ",a.nilai,a.no_polis,a.no_dokumen,convert(varchar,a.tgl_dokumen,103) as tgl_dokumen,a.alamat,b.nama as loker,c.nama as sebab,d.nama as objek, e.nama as pic, a.no_tel "+ 
						 ",f.tanggal as tgl_progress,f.catatan,isnull(g.no_testing,'-') as no_testing "+
						 "from tlk_klaim a "+
						 "inner join tlk_lokasi b on a.kode_lok=b.kode_lok and a.kode_lokasi=b.kode_lokasi and b.kode_ttg='"+this.app._kodeTtg+"' "+					 
						 "inner join tlk_obyek c on a.kode_obyek=c.kode_obyek and a.kode_lokasi=c.kode_lokasi and c.kode_ttg='"+this.app._kodeTtg+"' "+					 
						 "inner join tlk_sebab d on a.kode_sebab=d.kode_sebab and a.kode_lokasi=d.kode_lokasi and d.kode_ttg='"+this.app._kodeTtg+"' "+					 
						 "inner join tlk_hakakses e on a.nik_buat=e.nik and a.kode_lokasi=e.kode_lokasi and e.kode_ttg='"+this.app._kodeTtg+"' "+					 
						 "inner join tlk_progress f on a.no_klaim=f.no_klaim and a.kode_lokasi=f.kode_lokasi "+						 
						 "left  join tlk_testing g on a.no_klaim=g.no_klaim and f.status='FINAL' "+
						 "where f.no_progress='"+this.e_nb.getText()+"' and f.kode_lokasi='"+this.app._lokasi+"'";			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){																																												
					this.notesting = line.no_testing;
					this.progLama = line.progress;					
					this.l_label.setCaption("Data "+line.status.toUpperCase());
					this.e_noklaim.setText(line.no_klaim);
					this.e_tglklaim.setText(line.tanggal);		
					this.e_nopolis.setText(line.no_polis);		
					this.e_nodok.setText(line.no_dokumen);		
					this.e_nilai.setText(floatToNilai(line.nilai));		
					this.e_tgldok.setText(line.tgl_dokumen);		
					this.e_lokasi.setText(line.alamat);		
					this.e_loker.setText(line.loker);		
					this.e_sebab.setText(line.sebab);		
					this.e_objek.setText(line.objek);		
					this.e_pic.setText(line.pic);		
					this.e_tel.setText(line.no_tel);												
					this.dp_d1.setText(line.tgl_progress);
					this.e_memo.setText(line.catatan);					
				} 
			}			
			this.sgUpld.clear();
			this.deleteFiles = [];
			this.listFiles = new arrayMap();			
			var data2 = this.dbLib.getDataProvider("select a.kode_vendor,b.nama,a.no_dokumen,convert(varchar,a.tgl_dok,103) as tgl_dok,a.no_file  "+
			            "from tlk_progress_dok a inner join tlk_vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+
						"where a.no_progress = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);			
			if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
				var line2;
				this.sgUpld.clear();
				for (var i in data2.rs.rows){
					line2 = data2.rs.rows[i];							
					this.listFiles.set(line2.no_file,line2.no_file); 
					this.sgUpld.appendData([line2.kode_vendor,line2.nama,line2.no_dokumen,line2.tgl_dok,line2.no_file, {filedest:line2.no_file, tmpfile:line2.no_file}]);
				}
			} else this.sgUpld.clear(1);									
			
			var data = this.dbLib.getDataProvider("select a.kode_vendor,b.nama,c.status,a.no_dokumen,convert(varchar,a.tgl_dok,103) as tgl_dok,c.catatan,a.no_file "+ 
						   "from tlk_progress_dok a inner join tlk_progress c on a.no_progress=c.no_progress and a.kode_lokasi=c.kode_lokasi and a.no_progress<>'"+this.e_nb.getText()+"' "+ 
						   "					    inner join tlk_vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+
						   "where c.no_klaim='"+this.e_noklaim.getText()+"' and c.kode_lokasi='"+this.app._lokasi+"' order by c.status",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sgUpld2.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sgUpld2.appendData([line.kode_vendor,line.nama,line.status,line.no_dokumen,line.tgl_dok,line.catatan,line.no_file]);
				}
			} else this.sgUpld2.clear(1);
		}
	},				
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");
							this.app._mainForm.bClear.click();							
							this.fileUtil.deleteFiles(this.deletedFiles);
							this.uploadedFiles = "";
							this.deletedFiles = "";
						}else system.info(this,result,"");
	    			break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sgUpld) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Vendor",sender,undefined, 
					"select kode_vendor, nama from tlk_vendor where kode_lokasi = '"+this.app._lokasi+"'", 
					"select count(kode_vendor) from tlk_vendor where kode_lokasi = '"+this.app._lokasi+"'",
					["kode_vendor","nama"],"and",["Kode","Nama"],false);				
				}					
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doGridChange: function(sender, col, row,param1,result, data){
	    try{
        	if (sender == this.sgUpld && col == 5){ 
				if (this.uploadedFiles == undefined) this.uploadedFiles = "";
				if (this.uploadedFiles != "") this.uploadedFiles +=";";
				this.uploadedFiles+= this.rootDir+"/"+this.sgUpld.columns.get(5).param2 + data.tmpfile;
                this.sgUpld.cells(4,row, data.filedest);                
            }
         }catch(e){
            alert(e+" "+data);
         }
    }
});