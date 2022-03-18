window.app_saku3_transaksi_produk_fPresensi = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_produk_fPresensi.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_produk_fPresensi";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Presensi Siswa", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);	

		this.cb_ta = new portalui_saiCBBL(this,{bound:[20,10,220,20],caption:"Tahun Ajaran",multiSelection:false,tag:2,change:[this,"doChange"]});			
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Data Presensi Siswa","Daftar Presensi Siswa"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:4,tag:9,
		            colTitle:["Kode Kelas","Nama Kelas","Tanggal","Tahun Ajaran"],
					colWidth:[[3,2,1,0],[150,150,250,150]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		 
		this.l_tgl = new portalui_label(this.pc1.childPage[0],{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]});
		this.cb_kelas = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,13,220,20],caption:"Kelas",multiSelection:false,tag:1});	
		this.bTampil = new portalui_button(this.pc1.childPage[0],{bound:[818,13,80,18],caption:"Load Data",click:[this,"doLoadData1"]});		
		this.bRekon = new button(this.pc1.childPage[0],{bound:[913,13,80,18],caption:"Rekon", click:[this,"doRekon"]});

		this.pc2 = new pageControl(this.pc1.childPage[0],{bound:[5,12,990,370], childPage:["Data Siswa","Data Presensi"]});		
		this.sg = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:3,tag:9,
		            colTitle:["NIS","Status","Keterangan"],					
					colWidth:[[2,1,0],[300,80,150]],		   			
					columnReadOnly:[true,[0,1]],
					autoAppend:true,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:bsAll,grid:this.sg});		
		
		this.sg2 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:3,tag:2,
		            colTitle:["NIS","Status","Keterangan"],					
					colWidth:[[2,1,0],[300,80,150]],			
					pasteEnable:true,autoPaging:true,rowPerPage:20,afterPaste:[this,"doAfterPaste"], 		
					readOnly:true,
					autoAppend:false,defaultRow:1});		
		this.sgn2 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:bsAll,grid:this.sg2,pager:[this,"doPager2"]});		

		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();			
			this.doLoad();		
			this.cb_ta.setSQL("select kode_ta, nama from sis_ta where kode_lokasi = '"+this.app._lokasi+"' and kode_pp = '"+this.app._kodePP+"'",["kode_ta","nama"],false,["Kode TA","nama"],"and","Data TA",true);			
			this.cb_kelas.setSQL("select kode_kelas, nama from sis_kelas where kode_lokasi = '"+this.app._lokasi+"' and kode_pp = '"+this.app._kodePP+"'",["kode_kelas","nama"],false,["Kode Kelas","Nama"],"and","Data Kelas",true);			

			var strSQL = "select kode_ta from sis_ta where flag_aktif='1' and kode_pp = '"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"'";						   
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line3 = data.rs.rows[0];							
				if (line3 != undefined){																			
					this.cb_ta.setText(line3.kode_ta);	
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_produk_fPresensi.extend(window.childForm);
window.app_saku3_transaksi_produk_fPresensi.implement({
	doAfterPaste: function(sender,totalRow){
		try {
			this.sgn2.setTotalPage(sender.getTotalPage());
			this.sgn2.rearrange();										
		} catch(e) {alert(e);}
	},
	doPager2: function(sender,page){
		this.sg2.doSelectPage(page);
	},
	doRekon: function(sender){				
		try {
			for (var i=0;i < this.sg2.getRowCount();i++){
				for (var j=0;j < this.dataJU1.rs.rows.length;j++){
					if (this.dataJU1.rs.rows[j].nis == this.sg2.cells(0,i)) {						
						this.dataJU1.rs.rows[j].stsapp = this.sg.cells(1,j,this.sg2.cells(1,i));
						this.dataJU1.rs.rows[j].ket = this.sg.cells(2,j,this.sg2.cells(2,i));
					}
				}																			
			}
			this.pc2.setActivePage(this.pc2.childPage[0]);	
			this.pc1.setActivePage(this.pc1.childPage[0]);	
		}
		catch(e) {
			alert(e);
		}
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
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from sis_presensi where kode_kelas = '"+this.cb_kelas.getText()+"' and tanggal = '"+this.dp_d1.getText()+"' and kode_ta = '"+this.cb_ta.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}			

					for (var i=0;i < this.dataJU1.rs.rows.length;i++){
						 var line = this.dataJU1.rs.rows[i];
						 sql.add("insert into sis_presensi(nis,kode_kelas,kode_ta,tgl_input,status,kode_lokasi,kode_pp,keterangan,tanggal) values "+
								 "('"+line.nis+"','"+this.cb_kelas.getText()+"','"+this.cb_ta.getText()+"',getdate(),'"+line.stsapp+"','"+this.app._lokasi+"','"+this.app._kodePP+"','"+line.ket+"','"+this.dp_d1.getDateString()+"')");
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
					sql.add("delete from sis_presensi where kode_kelas = '"+this.cb_kelas.getText()+"' and tanggal = '"+this.dp_d1.getText()+"' and kode_ta = '"+this.cb_ta.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and kode_pp = '"+this.app._kodePP+"'");
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
				if (modalResult == mrOk) this.standarLib.clearByTag(this, new Array("0","1"));
				setTipeButton(tbAllFalse);
				this.doLoad();
				this.sg.clear();
				this.sg2.clear();
				this.pc1.setActivePage(this.pc1.childPage[0]);	
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
	doLoadData1:	function(sender){
		if (this.cb_kelas.getText()!="") {
			var strSQL = "select 'HADIR' as stsapp,'-' as ket, nis from sis_siswa where flag_aktif='1' and kode_kelas = '"+this.cb_kelas.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"' ";						
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU1 = data;							
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/this.app._pageRow));
				this.sgn.rearrange();
				this.doTampilData1(1);
			} else this.sg.clear(1);	
		}
		else {
			system.alert(this,"Kelas harus diisi.","Pilih dari daftar");
		}			
	},
	doTampilData1: function(page) {
		this.sg.clear();
		var line;
		this.page = page;
		var start = (page - 1) * this.app._pageRow;
		var finish = (start + this.app._pageRow > this.dataJU1.rs.rows.length? this.dataJU1.rs.rows.length:start+this.app._pageRow);
		for (var i=start;i<finish;i++){
			line = this.dataJU1.rs.rows[i];													
			this.sg.appendData([line.nis,line.stsapp.toUpperCase(),line.ket]); 
		}
		this.sg.setNoUrut(start);
	},
	doPager1: function(sender, page) {
		this.doTampilData1(page);
	},
		
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[0]);														
				this.cb_ta.setText(this.sg1.cells(3,row));
				this.cb_kelas.setText(this.sg1.cells(0,row));
				this.dp_d1.setText(this.sg1.cells(2,row));	

				var data = this.dbLib.getDataProvider("select a.nis, a.status,a.keterangan from sis_presensi a  where a.kode_kelas = '"+this.cb_kelas.getText()+"' and a.kode_ta = '"+this.cb_ta.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_pp='"+this.app._kodePP+"' ",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					this.sg.appendData([line.nis,line.status,line.keterangan]);
				}
			} else this.sg.clear(1);				
							
			}
		} catch(e) {alert(e);}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
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
	},
	doChange: function(sender){
		try{
			if(sender == this.cb_ta && this.cb_ta.getText() != ""){	
				this.doLoad(1);
			}	
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doLoad:function(sender){								
		var strSQL = "select a.kode_kelas, a.kode_ta, b.nama,a.tanggal from sis_presensi a inner join sis_kelas b on a.kode_kelas=b.kode_kelas where a.kode_lokasi='"+this.app._lokasi+"' and a.kode_pp='"+this.app._kodePP+"' and a.kode_ta='"+this.cb_ta.getText()+"' group by a.kode_kelas,b.nama,a.kode_ta,a.tanggal";		
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
	},
	
	doTampilData: function(page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg1.appendData([line.kode_kelas,line.nama,line.tanggal,line.kode_ta]); 
		}
		this.sg1.setNoUrut(start);
		this.pc1.setActivePage(this.pc1.childPage[0]);	
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	}
});
