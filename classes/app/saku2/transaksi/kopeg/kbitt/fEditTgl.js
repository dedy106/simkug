window.app_saku2_transaksi_kopeg_kbitt_fEditTgl = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_kbitt_fEditTgl.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_kbitt_fEditTgl";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Edit Tanggal KasBank : Input", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");		
		this.pc1 = new pageControl(this,{bound:[10,18,1000,500], childPage:["Data KasBank","Detail KasBank","Filter Data"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:8,tag:0,
		            colTitle:["No KasBank","Tanggal","Akun","Uraian","Nominal","Tgl Input","User","Periode"],
					colWidth:[[7,6,5,4,3,2,1,0],[70,150,70,100,250,150,80,100]],
					columnReadOnly:[true,[0,1,2,3,4,5,6,7],[]],
					colFormat:[[4],[cfNilai]],					
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
		
		this.e_noaju = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,450,20],caption:"No KasBank", readOnly:true});						
		this.e_akun = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,450,20],caption:"Akun", readOnly:true});								
		this.e_ket = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,450,20],caption:"Deskripsi", readOnly:true});								
		this.l_tgl1 = new portalui_label(this.pc1.childPage[1],{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[1],{bound:[120,11,100,18]}); 		
		this.e_tglinput = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,11,450,20],caption:"Tgl Input", readOnly:true});												
		this.e_user = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,19,450,20],caption:"User Input", readOnly:true});								
		this.e_periode2 = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,19,450,20],caption:"Periode", readOnly:true});												
		this.e_total = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,200,20],caption:"Nilai KasBank", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.l_tgl2 = new portalui_label(this.pc1.childPage[2],{bound:[20,11,100,18],caption:"Dr Tanggal", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc1.childPage[2],{bound:[120,11,100,18]}); 		
		this.l_tgl3 = new portalui_label(this.pc1.childPage[2],{bound:[20,12,100,18],caption:"Sd Tanggal", underline:true});
		this.dp_d3 = new portalui_datePicker(this.pc1.childPage[2],{bound:[120,12,100,18]}); 				
		this.e_nobukti = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,11,200,20],caption:"No KasBank",tag:9});
		this.e_nominal = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,12,200,20],caption:"Nominal", tipeText:ttNilai, text:"0",tag:9});				
		this.bCari = new button(this.pc1.childPage[2],{bound:[230,12,80,18],caption:"Cari Data",click:[this,"doCari"]});			
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		this.pc1.childPage[2].rearrangeChild(10, 23);	
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_kbitt_fEditTgl.extend(window.childForm);
window.app_saku2_transaksi_kopeg_kbitt_fEditTgl.implement({
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
					var vPeriode = this.dp_d1.getText().substr(6,4) + this.dp_d1.getText().substr(3,2);					
					sql.add("update kas_m set periode='"+vPeriode+"',tanggal='"+this.dp_d1.getDateString()+"' where no_kas='"+this.e_noaju.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");		
					sql.add("update kas_j set periode='"+vPeriode+"',tanggal='"+this.dp_d1.getDateString()+"' where no_kas='"+this.e_noaju.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");		
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
					this.standarLib.clearByTag(this, new Array("0","1","9"),undefined);
					this.sg.clear(1);
					this.pc1.setActivePage(this.pc1.childPage[0]);										
					setTipeButton(tbSimpan);
				break;
			case "simpan" :									
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);																
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
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
	doDoubleClick: function(sender, col , row) {
		if (this.sg.cells(0,row) != "") {			
			this.pc1.setActivePage(this.pc1.childPage[1]);									
			this.e_noaju.setText(this.sg.cells(0,row));						
			this.e_akun.setText(this.sg.cells(2,row));						
			this.e_ket.setText(this.sg.cells(3,row));			
			this.dp_d1.setText(this.sg.cells(1,row));			
			this.e_tglinput.setText(this.sg.cells(5,row));			
			this.e_user.setText(this.sg.cells(6,row));			
			this.e_total.setText(this.sg.cells(4,row));									
			this.e_periode2.setText(this.sg.cells(7,row));						
		}
	},	
	doCari:function(sender){				
		var filter = " where a.posted in ('X','F') and a.tanggal between '"+this.dp_d2.getDateString()+"' and '"+this.dp_d3.getDateString()+"' and a.kode_lokasi='"+this.app._lokasi+"'";		
		if (this.e_nobukti.getText()!="") filter = " and a.no_kas='"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
		if (nilaiToFloat(this.e_nominal.getText())!=0) filter = " and a.nilai="+nilaiToFloat(this.e_nominal.getText())+" and a.kode_lokasi='"+this.app._lokasi+"'";		
		
		var strSQL = "select no_kas,convert(varchar,a.tanggal,103) as tanggal,a.akun_kb+' - '+isnull(c.nama,'-') as akun,a.keterangan,a.nilai,convert(varchar,a.tgl_input,103) as tgl_input,d.nik+' - '+d.nama as nik_user,a.periode "+
		             "from kas_m a "+					 
		             "inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+					 
					 "inner join hakakses d on d.nik=a.nik_user and a.kode_lokasi=d.kode_lokasi "+					 
					 "inner join masakun c on a.akun_kb=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+filter;					 					
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);
		this.pc1.setActivePage(this.pc1.childPage[0]);
	},
	doTampilData: function(page) {
		this.sg.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];										
			this.sg.appendData([line.no_kas,line.tanggal,line.akun,line.keterangan,floatToNilai(line.nilai),line.tgl_input,line.nik_user,line.periode]);
		}
		this.sg.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_noaju.getText()+")","");							
							this.clearLayar();							
						}else system.info(this,result,"");	    			
	    			break;					
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},			
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1","9"),undefined);
			this.sg.clear(1); 
			this.pc1.setActivePage(this.pc1.childPage[0]);					
			setTipeButton(tbSimpan);
		} catch(e) {
			alert(e);
		}
	}
});