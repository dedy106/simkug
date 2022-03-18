window.app_saku3_transaksi_uin_fSPPD = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_uin_fSPPD.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_uin_fSPPD";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Update Bukti SILABI", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);
		
		this.c_tahun = new saiLabelEdit(this,{bound:[20,12,200,20],caption:"Tahun",readOnly:true,tag:2, change:[this,"doChange"]});
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,470], childPage:["Data SILABI","Daftar SILABI"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:4,tag:9,
		             colTitle:["No Bukti","Tanggal","Keterangan","Pilih"],
					 colWidth:[[3,2,1,0],[70,300,100,100]],readOnly:true,	
					 colFormat:[[3],[cfButton]],	
					 click:[this,"doSgBtnClick1"], colAlign:[[3],[alCenter]],					 				 
					 dblClick:[this,"doDoubleClick1"],autoAppend:false,defaultRow:1});			
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		this.bLoad = new portalui_imageButton(this.sgn1,{bound:[this.sgn1.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Pengajuan",click:[this,"doLoad"]});				

		this.l_tgl1 = new portalui_label(this.pc1.childPage[0],{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 				
		this.e_nb = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc1.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_ket = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:200});				
		this.e_dok = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,18,450,20],caption:"No SILABI", maxLength:200});				
		this.l_tgl2 = new portalui_label(this.pc1.childPage[0],{bound:[20,11,100,18],caption:"Tanggal SILABI", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,11,98,18]}); 				
		this.e_file = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,450,20],caption:"File Upload", readOnly:true, tag:9});		
		this.uploader = new uploader(this.pc1.childPage[0],{bound:[480,15,80,18],caption:"Browse File", param1:"uploadTo",param2:"server/media/tmp/",param3:"object",param4:"server/media/",autoSubmit:true, afterUpload:[this,"doAfterLoad"]});				
		this.bLihat = new button(this.pc1.childPage[0],{bound:[580,15,80,18],caption:"Lihat File",click:[this,"doLihat"],visible:false});			
		this.e_total = new saiLabelEdit(this.pc1.childPage[0],{bound:[790,15,200,20],caption:"Total SILABI", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});					
		
		this.pc2 = new pageControl(this.pc1.childPage[0],{bound:[1,12,995,298], childPage:["Daftar Agenda","Detail RAB","Controlling"]});								
		this.sg = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:7,tag:9,
					colTitle:["Status","Fak/Unit","No Agenda","Tanggal","Deskripsi","Nilai","Detail"],
					colWidth:[[6,5,4,3,2,1,0],[80,100,300,80,100,200,70]],					
					columnReadOnly:[true,[0,1,2,3,4,5,6],[]],					
					buttonStyle:[[0],[bsAuto]],
					picklist:[[0],[new portalui_arrayMap({items:["UPDATE","INPROG"]})]],
					colFormat:[[5,6],[cfNilai,cfButton]],					
					dblClick:[this,"doDoubleClick"],click:[this,"doSgBtnClick"], colAlign:[[6],[alCenter]],		
					nilaiChange:[this,"doNilaiChange"],	change:[this,"doChangeCell"],						
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg});		

		this.sg4 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:12,tag:9,
					colTitle:["KdTrm","Nama Penerima","Deskripsi","IDItem","Satuan","Harga","Vol","Jumlah","PPN","PPh","Total","KdAkun"],
					colWidth:[[11,10,9,8,7,6,5,4,3,2,1,0],[80,80,60,60,80,60,60,60,60,200,200,80]],					
					colHide:[[0,3],[true,true]],
					readOnly:true,				
					colFormat:[[5,6,7,8,9,10],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],												
					autoAppend:false,defaultRow:1});
		this.sgn4 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg4});		

		this.sg2 = new saiGrid(this.pc2.childPage[2],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:8,tag:9, 
					colTitle:["KdGiat","KdOut","KdSOut","KdKmpnen","KdSKmpnen","KdAkun","Saldo Budget","Ni Pengajuan"],
					colWidth:[[7,6,5,4,3,2,1,0],[100,100,100,100,100,100,100,100]],
					colFormat:[[6,7],[cfNilai,cfNilai]],readOnly: true,autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc2.childPage[2],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg2});		

		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();

			this.stsSimpan = 1;		
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);			

			this.rootDir = this.app._rootDir;
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_uin_fSPPD.extend(window.childForm);
window.app_saku3_transaksi_uin_fSPPD.implement({
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
	doLoadAju: function() {		
		var strSQL = "select a.no_aju,convert(varchar,a.tanggal,103) as tgl,a.keterangan, a.nilai-a.ppn-a.pph as nilai, a.kode_pp+' | '+b.nama as pp "+
					 "from uin_aju_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
					 "				   inner join uin_nota_m c on a.no_nota=c.no_nota and a.kode_lokasi=c.kode_lokasi and c.no_kas<>'-' "+
					 "where a.progress='3' and a.jenis='RM' and a.kode_lokasi='"+this.app._lokasi+"' and substring(a.periode,1,4) <= '"+this.c_tahun.getText()+"' order by a.kode_pp,a.no_aju";							 											 
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];						
				this.sg.appendData(["INPROG",line.pp,line.no_aju,line.tgl,line.keterangan,floatToNilai(line.nilai),"Detail"]);
			}					
		} else this.sg.clear(1);
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
			if (this.stsSimpan == 1) this.doClick(this.i_gen);			
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					

					if (this.stsSimpan == 0) {
						sql.add("delete from uin_sppd_m where no_sppd = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");							
						sql.add("update uin_aju_m set no_sppd='-',progress='3' where no_sppd = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					}					
					
					sql.add("insert into uin_sppd_m (no_sppd,kode_lokasi,tanggal,periode,nik_user,tgl_input,keterangan,no_dokumen,tgl_sppd,no_gambar,nilai,no_kas) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.periode+"','"+this.app._userLog+"',getdate(),'"+this.e_ket.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d2.getDateString()+"','"+this.e_file.getText()+"',"+nilaiToFloat(this.e_total.getText())+",'-')");

					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i) && this.sg.cells(0,i) == "UPDATE") {
								sql.add("update uin_aju_m set no_sppd='"+this.e_nb.getText()+"',progress='4' where no_aju='"+this.sg.cells(2,i)+"' and kode_lokasi='"+this.app._lokasi+"'");								
							}
						}
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
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from uin_sppd_m where no_sppd = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");							
					sql.add("update uin_aju_m set no_sppd='-',progress='3' where no_sppd = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
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
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);
					this.sg.clear(1); this.sg1.clear(1); this.sg2.clear(1); this.sg4.clear(1);					
					setTipeButton(tbAllFalse);	
					this.doLoadAju();	
					this.pc1.setActivePage(this.pc1.childPage[0]);				
					this.pc2.setActivePage(this.pc2.childPage[0]);				
				}
				break;
			case "simpan" :	
			case "ubah" :
				this.preView = "1";
				this.sg.validasi();	
				var ketemu = false;
				if (this.sg.getRowValidCount() > 0){
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i) && this.sg.cells(0,i) == "UPDATE") {
							ketemu = true;
						}
					}
				}			
				if (!ketemu) {
					system.alert(this,"Transaksi tidak valid.","Tidak ada rekap pengajuan yang berstatus 'UPDATE'.");
					return false;
				} 
				else 
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :
				this.preView = "0";	
				this.hapus();
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.c_tahun.setText(y);
		this.periode = (y+""+m);		
		
		if (this.stsSimpan == 1) {
			this.doClick(this.i_gen);			
			this.doLoadAju();	
		}
	},
	doClick:function(sender){
		if (sender == this.i_gen) {			
			if (this.stsSimpan == 0) {									
				this.sg.clear(1); 		
				this.bLihat.hide();		
			}	
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"uin_sppd_m","no_sppd",this.app._lokasi+"-SIL"+this.c_tahun.getText().substr(2,2)+".","00000"));			
			this.e_ket.setFocus();
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;
		}		
	},	
	doSgBtnClick: function(sender, col, row){
		try{
			if (col === 6) {
				this.noaju = this.sg.cells(2,row);
				var strSQL = "select a.*,c.nama as atensi, a.total-a.ppn-a.pph as neto, a.idbukti+cast(a.nu as varchar) as iditem "+
							"from uin_aju_d a inner join uin_atensi c on a.kode_atensi=c.kode_atensi and a.kode_lokasi=c.kode_lokasi "+
							"where a.no_aju = '"+this.sg.cells(2,row)+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu";					 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg4.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg4.appendData([line.kode_atensi,line.atensi,line.keterangan,line.iditem,line.satuan,floatToNilai(line.tarif),floatToNilai(line.vol),floatToNilai(line.total),floatToNilai(line.ppn),floatToNilai(line.pph),floatToNilai(line.neto),line.kode_akun]);
					}					
				} else this.sg4.clear(1);	

				var strSQL = "select * from uin_aju_r where no_aju = '"+this.sg.cells(2,row)+"' and kode_lokasi='"+this.app._lokasi+"' order by no_urut";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg2.appendData([line.kdgiat,line.kdoutput,line.kdsoutput,line.kdkmpnen,line.kdskmpnen,line.kode_akun,floatToNilai(line.saldo),floatToNilai(line.nilai)]);
					}					
				} else this.sg2.clear(1);	

				this.pc2.setActivePage(this.pc2.childPage[1]);	
			}
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick: function(sender, col , row) {
		if (this.sg.cells(0,row) == "INPROG") this.sg.cells(0,row,"UPDATE");
		else this.sg.cells(0,row,"INPROG");
	},	
	doChangeCell: function(sender, col, row){
		if (col == 0) this.sg.validasi();
	},
	doNilaiChange: function(){
		try{
			var tot=0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(5,i) != "" && this.sg.cells(0,i)=="UPDATE"){					
					tot += nilaiToFloat(this.sg.cells(5,i));						
				}
			}
			this.e_total.setText(floatToNilai(tot));			
		}catch(e)
		{
			alert("doNilaiChange: "+e);
		} 
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)	{
							if (this.preView == "1") {
								if (this.fileBfr && this.dataUpload) {
									if (this.fileBfr != this.e_file.getText()) this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.fileBfr);
								}									
								if (this.dataUpload) this.fileUtil.copyFileTo(this.rootDir+"/"+this.uploader.param2+this.dataUpload.tmpfile,this.rootDir+"/"+this.uploader.param4+this.dataUpload.filedest);
							}
							else {
								if (this.fileBfr && this.dataUpload) {
									if (this.fileBfr != this.e_file.getText()) this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.fileBfr);
								}
							}							
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (Kode : "+ this.e_nb.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
					break;					
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doLoad:function(sender){	
		try{					
			var strSQL = "select a.no_sppd,convert(varchar,a.tanggal,103) as tgl,a.keterangan "+
						 "from uin_sppd_m a "+						 
						 "where a.kode_lokasi='"+this.app._lokasi+"' and a.periode like '"+this.c_tahun.getText()+"%' and a.no_kas ='-' order by a.no_sppd desc";							 						
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);						
		}
		catch(e) {
			alert(e);
		}
	},		
	doTampilData: function(page) {		
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg1.appendData([line.no_sppd,line.tgl,line.keterangan,"Pilih"]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doSgBtnClick1: function(sender, col, row){
		try{
			if (col === 3) this.doDoubleClick1(this.sg1,0,row);						
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick1: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.bLihat.show();
				this.stsSimpan = 0;
				this.pc1.setActivePage(this.pc1.childPage[0]);
				this.pc2.setActivePage(this.pc2.childPage[0]);
				this.e_nb.setText(this.sg1.cells(0,row));	
														
				var data = this.dbLib.getDataProvider("select * from uin_sppd_m where no_sppd='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){			
						this.dp_d1.setText(line.tanggal);											
						this.dp_d2.setText(line.tgl_sppd);											
						this.e_ket.setText(line.keterangan);
						this.e_dok.setText(line.no_dokumen);
						this.e_file.setText(line.no_gambar);	
						this.fileBfr = line.no_gambar;
					} 
				}			
				
				var strSQL = "select a.no_aju,convert(varchar,a.tanggal,103) as tgl,a.keterangan, a.nilai-a.ppn-a.pph as nilai, a.kode_pp+' | '+b.nama as pp "+
							 "from uin_aju_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							 "where a.no_sppd='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.kode_pp,a.no_aju";							 											 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];						
						this.sg.appendData(["UPDATE",line.pp,line.no_aju,line.tgl,line.keterangan,floatToNilai(line.nilai),"Detail"]);
					}					
				} else this.sg.clear(1);
			}
		} catch(e) {alert(e);}
	}	
});