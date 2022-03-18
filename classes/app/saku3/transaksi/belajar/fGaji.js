window.app_saku3_transaksi_belajar_fGaji = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_belajar_fGaji.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_belajar_fGaji";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Gaji", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
				
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Daftar Gaji","Data Gaji","Filter Cari"]});
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:6,tag:9,
		            colTitle:["No Gaji","Jenis Gaji","Tanggal","Nip","Jumlah","Keterangan"],
					colWidth:[[5,4,3,2,1,0],[510,180,80,80,100,100]],colFormat:[[4],[cfNilai]],					
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"No Gaji",maxLength:10,change:[this,"doChange"]});		
		this.cb_jenis = new saiCBBL(this.pc1.childPage[1],{bound:[20,14,220,20],caption:"Jenis Gaji", multiSelection:false, maxLength:10, tag:2});
		this.e_tgl = new portalui_label(this.pc1.childPage[1],{bound:[20,11,100,20],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[1],{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.cb_nip = new saiCBBL(this.pc1.childPage[1],{bound:[20,14,220,20],caption:"Nip", multiSelection:false, maxLength:10, tag:2});		
		this.e_jumlah = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,300,20],caption:"Jumlah Gaji",maxLength:50,tag:9,tipeText:ttNilai, text:"0"});		
		this.e_ket = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,300,20],caption:"Keterangan",maxLength:50,tag:9});
		
		this.e_kode2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,10,200,20],caption:"No Gaji",maxLength:10,tag:9});		
		this.cb_nip2 = new saiCBBL(this.pc1.childPage[2],{bound:[20,14,220,20],caption:"Nip", multiSelection:false, maxLength:10, tag:2});			
		this.bLoad = new button(this.pc1.childPage[2],{bound:[120,11,80,18],caption:"Cari Data",click:[this,"doCari"]});			
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);		
		this.pc1.childPage[2].rearrangeChild(10, 23);		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.cb_jenis.setSQL("select kode_jns,nama_jns from jenisgajid ",["kode_jns","nama_jns"],false,["Kode","Jenis"],"where","Jenis Gaji",true);			
			this.cb_nip.setSQL("select nip,nama from karyawand ",["nip","nama"],false,["nip","Nama"],"where","Data karyawand",true);
			this.cb_nip2.setSQL("select nip,nama from karyawand ",["nip","nama"],false,["nip","Nama"],"where","Data karyawand",true);

			
			this.doLoad();
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_belajar_fGaji.extend(window.childForm);
window.app_saku3_transaksi_belajar_fGaji.implement({
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
					sql.add("insert into gajid(no_gj, kode_jns, tgl, nip, jmlh, ket) values "+
							"('"+this.cb_kode.getText()+"','"+this.cb_jenis.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_nip.getText()+"','"+parseNilai(this.e_jumlah.getText())+"','"+this.e_ket.getText()+"')");
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
	ubah: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					sql.add("delete from gajid where no_gj = '"+this.cb_kode.getText()+"'");			
					sql.add("insert into gajid(no_gj, kode_jns, tgl, nip, jmlh, ket) values "+
							"('"+this.cb_kode.getText()+"','"+this.cb_jenis.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_nip.getText()+"','"+parseNilai(this.e_jumlah.getText())+"','"+this.e_ket.getText()+"')");
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
					sql.add("delete from gajid where no_gj= '"+this.cb_kode.getText()+"'");			
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
					this.standarLib.clearByTag(this, new Array("0","1","9"),this.cb_kode);
					setTipeButton(tbAllFalse);
					this.doLoad();
				}
				break;
			case "simpan" :	
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "ubah" :	
				this.ubah();
				break;				
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doChange: function(sender){
		try{
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){
				var strSQL = "select no_gj, kode_jns, tgl, nip, jmlh, ket "+
				             "from gajid where no_gj ='"+this.cb_kode.getText()+"' ";						   				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.cb_jenis.setText(line.kode_gajid);
						this.dp_d1.setDateString(line.tanggal);
						this.cb_nip.setText(line.nip);
						this.e_jumlah.setText(floatToNilai(line.jumlah));
						this.e_ket.setText(line.keterangan);
						
						setTipeButton(tbUbahHapus);
					}
					else{
						this.standarLib.clearByTag(this, new Array("1"),undefined);
						setTipeButton(tbSimpan);
					}
				}
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	},			
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.cb_kode.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	      		break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doCari:function(sender){								
		try {
			if (this.e_kode2.getText() != "") {
				var filter = " no_gj like '%"+this.e_kode2.getText()+"%' ";
			}
			if (this.cb_nip2.getText() != "") {
				var filter = filter + " nip like '%"+this.cb_nip2.getText()+"%' ";
			}
			var strSQL = "select no_gj,kode_jns,tgl,nip,jmlh,ket from gajid "+						 
						 "where "+filter;
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);			
			this.pc1.setActivePage(this.pc1.childPage[0]);
		} 
		catch(e) {
			alert(e);
		}
	},
	doLoad:function(sender){								
		try {			
			var strSQL = "select no_gj, kode_jns, tgl, nip, jmlh, ket from gajid";	
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);			
			this.pc1.setActivePage(this.pc1.childPage[0]);			
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
			this.sg1.appendData([line.no_gj,line.kode_jns,line.tgl,line.nip,floatToNilai(line.jmlh),line.ket]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.cb_kode.setText(this.sg1.cells(0,row));
				this.cb_jenis.setText(this.sg1.cells(1,row));
				this.dp_d1.setDateString(this.sg1.cells(2,row)); 	
				this.cb_nip.setText(this.sg1.cells(3,row));	
				this.e_jumlah.setText(this.sg1.cells(4,row));		
				this.e_ket.setText(this.sg1.cells(5,row));				
			}
		} catch(e) {alert(e);}
	}
});