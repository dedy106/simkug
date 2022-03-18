window.app_saku3_transaksi_uin_fSPM = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_uin_fSPM.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_uin_fSPM";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form SPM Agenda RM", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);
		
		this.c_tahun = new saiLabelEdit(this,{bound:[20,12,200,20],caption:"Tahun",readOnly:true,tag:2, change:[this,"doChange"]});
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,470], childPage:["Data SPM","Daftar SPM"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:3,tag:9,
		             colTitle:["No Bukti","Tanggal","Keterangan"],
					 colWidth:[[2,1,0],[300,100,100]],readOnly:true,					 
					 dblClick:[this,"doDoubleClick1"],autoAppend:false,defaultRow:1});			
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		this.bLoad = new portalui_imageButton(this.sgn1,{bound:[this.sgn1.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Pengajuan",click:[this,"doLoad"]});				

		this.l_tgl1 = new portalui_label(this.pc1.childPage[0],{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 				
		this.e_nb = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc1.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_ket = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:200});				
		this.e_dok = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,18,450,20],caption:"No SPM", maxLength:200});				
		this.l_tgl2 = new portalui_label(this.pc1.childPage[0],{bound:[20,11,100,18],caption:"Tgl SPM", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,11,98,18]}); 				
		
		this.pc2 = new pageControl(this.pc1.childPage[0],{bound:[1,12,995,321], childPage:["Daftar Agenda","Detail RAB","Controlling"]});								
		this.sg = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:6,tag:0,
					colTitle:["Fak/Unit","No Agenda","Tanggal","Deskripsi","Nilai","Detail"],
					colWidth:[[5,4,3,2,1,0],[50,100,300,80,100,200]],					
					columnReadOnly:[true,[0,1,2,3,4,5],[]],					
					colFormat:[[4,5],[cfNilai,cfButton]],					
					dblClick:[this,"doDoubleClick"],
					click:[this,"doSgBtnClick"], colAlign:[[5],[alCenter]],									
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg});		

		this.sg4 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:13,tag:0,
					colTitle:["KdTrm","Nama Penerima","Deskripsi","Kd Norma","Norma","Satuan","Harga","Vol","Jumlah","PPN","PPh","Total","KdAkun"],
					colWidth:[[12,11,10,9,8,7,6,5,4,3,2,1,0],[80,80,60,60,80,60,60,60,120,60,200,200,80]],					
					colHide:[[0,3],[true,true]],
					readOnly:true,				
					colFormat:[[6,7,8,9,10,11],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],												
					autoAppend:false,defaultRow:1});
		this.sgn4 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg4});		

		this.sg2 = new saiGrid(this.pc2.childPage[2],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:7,tag:9, 
					colTitle:["KdOut","KdSOut","KdKmpnen","KdSKmpnen","KdAkun","Saldo Budget","Ni Pengajuan"],
					colWidth:[[6,5,4,3,2,1,0],[100,100,100,100,100,100,100]],
					colFormat:[[5,6],[cfNilai,cfNilai]],readOnly: true,autoAppend:false,defaultRow:1});
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
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_uin_fSPM.extend(window.childForm);
window.app_saku3_transaksi_uin_fSPM.implement({		
	doLoadAju: function() {		
		var strSQL = "select a.no_aju,convert(varchar,a.tanggal,103) as tgl,a.keterangan, a.nilai+a.ppn-a.pph as nilai, a.kode_pp+' | '+b.nama as pp "+
					 "from uin_aju_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
					 "where a.jenis='RM' and a.progress = '2' and a.kode_lokasi='"+this.app._lokasi+"' and substring(a.periode,1,4) <= '"+this.c_tahun.getText()+"' order by a.kode_pp,a.no_aju";							 											 
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];						
				this.sg.appendData([line.pp,line.no_aju,line.tgl,line.keterangan,floatToNilai(line.nilai),"Detail"]);
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
						sql.add("delete from uin_spm_m where no_spm = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");							
						sql.add("update uin_aju_m set no_spm='-',progress='2' where no_spm = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					}					
					
					sql.add("insert into uin_spm_m (no_spm,kode_lokasi,tanggal,periode,nik_user,tgl_input,keterangan, no_dokumen, tgl_spm) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.periode+"','"+this.app._userLog+"',getdate(),'"+this.e_ket.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d2.getDateString()+"')");
					sql.add("update uin_aju_m set no_spm='"+this.e_nb.getText()+"',progress='3' where no_aju = '"+this.noaju+"' and kode_lokasi='"+this.app._lokasi+"'");	
					
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
					sql.add("delete from uin_spm_m where no_spm = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");							
					sql.add("update uin_aju_m set no_spm='-',progress='2' where no_spm = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					this.sg.clear(1); this.sg1.clear(1); this.sg2.clear(1); this.sg4.clear(1);					
					setTipeButton(tbAllFalse);	
					this.doLoadAju();	
					this.pc1.setActivePage(this.pc1.childPage[0]);				
					this.pc2.setActivePage(this.pc2.childPage[0]);				
				}
				break;
			case "simpan" :	
			case "ubah" :
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :	
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
			}	
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"uin_spm_m","no_spm",this.app._lokasi+"-SPM"+this.c_tahun.getText().substr(2,2)+".","00000"));			
			this.e_ket.setFocus();
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;
		}		
	},	
	doSgBtnClick: function(sender, col, row){
		try{
			if (col === 5) {
				this.doDoubleClick(this.sg1,1,row);
			}
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick: function(sender, col , row) {
		this.noaju = this.sg.cells(1,row);
		var strSQL = "select a.*,b.nama,c.nama as atensi, a.total+a.ppn-a.pph as neto "+
					 "from uin_aju_d a inner join uin_norma b on a.kode_norma=b.kode_norma and a.kode_lokasi=b.kode_lokasi and a.tahun=b.tahun "+
					 "				   inner join uin_atensi c on a.kode_atensi=c.kode_atensi and a.kode_lokasi=c.kode_lokasi "+
					 "where a.no_aju = '"+this.sg.cells(1,row)+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu";					 
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg4.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];							
				this.sg4.appendData([line.kode_atensi,line.atensi,line.keterangan,line.kode_norma,line.nama,line.satuan,floatToNilai(line.tarif),floatToNilai(line.vol),floatToNilai(line.total),floatToNilai(line.ppn),floatToNilai(line.pph),floatToNilai(line.neto),line.kode_akun]);
			}					
		} else this.sg4.clear(1);	

		var strSQL = "select * from uin_aju_r where no_aju = '"+this.sg.cells(1,row)+"' and kode_lokasi='"+this.app._lokasi+"' order by no_urut";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg2.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];							
				this.sg2.appendData([line.kdoutput,line.kdsoutput,line.kdkmpnen,line.kdskmpnen,line.kode_akun,floatToNilai(line.saldo),floatToNilai(line.nilai)]);
			}					
		} else this.sg2.clear(1);	

		this.pc2.setActivePage(this.pc2.childPage[1]);	
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
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
			var strSQL = "select a.no_spm,convert(varchar,a.tanggal,103) as tgl,a.keterangan "+
						 "from uin_spm_m a inner join uin_aju_m b on a.no_spm=b.no_spm and a.kode_lokasi=b.kode_lokasi "+						 
						 "where b.progress ='3' and b.kode_lokasi='"+this.app._lokasi+"' and a.periode like '"+this.c_tahun.getText()+"%' order by a.no_spm desc";							 						
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
			this.sg1.appendData([line.no_spm,line.tgl,line.keterangan]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doDoubleClick1: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;
				this.pc1.setActivePage(this.pc1.childPage[0]);
				this.pc2.setActivePage(this.pc2.childPage[0]);
				this.e_nb.setText(this.sg1.cells(0,row));	
														
				var data = this.dbLib.getDataProvider("select * from uin_spm_m where no_spm='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){			
						this.dp_d1.setText(line.tanggal);											
						this.dp_d2.setText(line.tgl_spm);											
						this.e_ket.setText(line.keterangan);
						this.e_dok.setText(line.no_dokumen);
					} 
				}			
				
				var strSQL = "select a.no_aju,convert(varchar,a.tanggal,103) as tgl,a.keterangan, a.nilai+a.ppn-a.pph as nilai, a.kode_pp+' | '+b.nama as pp "+
							 "from uin_aju_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							 "where a.no_spm='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.kode_pp,a.no_aju";							 											 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];						
						this.sg.appendData([line.pp,line.no_aju,line.tgl,line.keterangan,floatToNilai(line.nilai),"Detail"]);
					}					
				} else this.sg.clear(1);

				this.doDoubleClick(this.sg,1,0);
		
			}
		} catch(e) {alert(e);}
	}	
});