window.app_saku3_transaksi_ppbs_yakes_fFaHitung = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_ppbs_yakes_fFaHitung.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_ppbs_yakes_fFaHitung";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Hitung BP dan BPP: Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;tinymceCtrl;app_budget_svrProcess");
		this.e_tahun = new portalui_saiLabelEdit(this,{bound:[20,14,150,20],caption:"Tahun Angg",tag:2,readOnly:true});		
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,14,100,18],visible:false}); 		
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});								
		this.e_bp = new saiLabelEdit(this,{bound:[20,13,200,20],caption:"BP", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_bpp = new saiLabelEdit(this,{bound:[20,14,200,20],caption:"BPP", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.bTampil = new button(this,{bound:[845,14,80,18],caption:"Tampil Data",click:[this,"doLoad"]});			
		
		this.pc1 = new pageControl(this,{bound:[20,12,900,310], childPage:["Data Penyusutan","Data Pemeliharaan"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:17,tag:0,
		            colTitle:["No Aktap","Deskripsi","Nilai Perolehan","Tgl Perolehan","Kode PP","Akun Aktap","Akun BP","Akun Depresiasi",
                              "%Susut","Umur[bln]","N. Susut/bln","Total Akum. Susut","Jml Susut [bln]","Ttl Angg. Susut","Jenis Agg","Periode Susut","RKA BP"],
					colWidth:[[16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[ 80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,150,80]],					
					readOnly:true,autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:16,tag:9,
		            colTitle:["No Aktap","Deskripsi","Nilai Perolehan","Tgl Perolehan","Kode PP","Akun Aktap","Kode Param","Nama Parameter","Akun BPP",
							  "Umur Aktap[bln]","Satuan","Nilai","Jns Periode","Total","Jenis Agg","RKA BPP"],
					colWidth:[[15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[80,80,80,80,80,80,80,80,80,80,80,80,80,80,150,80]],					
					readOnly:true,autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2,pager:[this,"doPager2"]});
		
		this.rearrangeChild(10, 23);
							
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();			
			this.svrProcess = new app_budget_svrProcess();
			this.svrProcess.addListener(this);
			
			var tahun = parseFloat(this.dp_d1.year) + 1;
			this.e_tahun.setText(tahun);				
			this.dp_d1.setText('31/12/'+parseFloat(this.dp_d1.year));
			this.periodeBefore = parseFloat(this.dp_d1.year)+'12';
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_ppbs_yakes_fFaHitung.extend(window.childForm);
window.app_saku3_transaksi_ppbs_yakes_fFaHitung.implement({
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"agg_fasusut_m","no_susut",this.app._lokasi+"-BPBPP"+this.e_tahun.getText()+".","000"));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{																			
					uses("server_util_arrayList");
					sql = new server_util_arrayList();					
					this.svrProcess.saveData(this.e_nb.getText(), this.app._lokasi, this.dp_d1.getDateString(), this.e_tahun.getText(), this.periodeBefore, this.app._userLog);			
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
					this.sg.clear(1); this.sg2.clear(1); 			
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
				 
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
		}
	},	
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"agg_fasusut2_m","no_susut",this.app._lokasi+"-BPBPP"+this.e_tahun.getText()+".","000"));
	},		
	doLoad:function(sender){			
		var strSQL = "select a.no_fa,a.nama,a.nilai,a.tgl_perolehan,a.kode_pp2,"+
					 "	b.kode_akun,b.akun_bp,b.akun_deprs,"+
					 "	a.persen,a.umur,round(a.nilai * a.persen/100/12,0) as nilai_susut "+
					 "  ,  case when (datediff(month,a.tgl_susut,'"+this.dp_d1.getDateString()+"')+1) * (round(a.nilai * a.persen/100/12,0)) < 0 then 0 else (datediff(month,a.tgl_susut,'"+this.dp_d1.getDateString()+"')+1) * (round(a.nilai * a.persen/100/12,0)) end as akum_susut "+
					 "	,  case when datediff(month,a.tgl_susut,'"+this.dp_d1.getDateString()+"')+1 > 0 then (case when (a.umur - (case when (datediff(month,a.tgl_susut,'"+this.dp_d1.getDateString()+"')+1) < a.umur then (datediff(month,a.tgl_susut,'"+this.dp_d1.getDateString()+"')+1) else a.umur end)) > 12 then 12 else (a.umur - (case when (datediff(month,a.tgl_susut,'"+this.dp_d1.getDateString()+"')+1) < a.umur then (datediff(month,a.tgl_susut,'"+this.dp_d1.getDateString()+"')+1) else a.umur end)) end) else (12 + datediff(month,a.tgl_susut,'"+this.dp_d1.getDateString()+"')+1) end as sisa_umur  "+
					 "	, (case when datediff(month,a.tgl_susut,'"+this.dp_d1.getDateString()+"')+1 > 0 then (case when (a.umur - (case when (datediff(month,a.tgl_susut,'"+this.dp_d1.getDateString()+"')+1) < a.umur then (datediff(month,a.tgl_susut,'"+this.dp_d1.getDateString()+"')+1) else a.umur end)) > 12 then 12 else (a.umur - (case when (datediff(month,a.tgl_susut,'"+this.dp_d1.getDateString()+"')+1) < a.umur then (datediff(month,a.tgl_susut,'"+this.dp_d1.getDateString()+"')+1) else a.umur end)) end) else (12 + datediff(month,a.tgl_susut,'"+this.dp_d1.getDateString()+"')+1) end) * (round(a.nilai * a.persen/100/12,0)) as susutnext  "+
					 "	,  case a.jenis_agg when 'P' then 'ESTIMASI' when 'T' then 'TAMBAH' when 'E' then 'EXIST' end as jenis_agg,a.periode_susut,a.kode_rka2 "+
					 "from agg_fa_asset a inner join agg_fa_klpakun b on a.kode_klpakun=b.kode_klpakun "+
					 "where a.kode_lokasi='"+this.app._lokasi+"' and a.tahun='"+this.e_tahun.getText()+"' and "+
					 "	case when (a.umur - (case when (datediff(month,a.tgl_susut,'"+this.dp_d1.getDateString()+"')+1) < a.umur then (datediff(month,a.tgl_susut,'"+this.dp_d1.getDateString()+"')+1) else a.umur end)) > 12 then 12 else (a.umur - (case when (datediff(month,a.tgl_susut,'"+this.dp_d1.getDateString()+"')+1) < a.umur then (datediff(month,a.tgl_susut,'"+this.dp_d1.getDateString()+"')+1) else a.umur end)) end > 0 "+
					 "order by a.no_fa";	
					
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);				
		var total = 0;		
		for (var i=0;i<this.dataJU.rs.rows.length;i++){
			line = this.dataJU.rs.rows[i];
			total += parseFloat(line.susutnext); 
		}		
		this.e_bp.setText(floatToNilai(total));
		
		/*
		var strSQL2 = "select "+
					"a.no_fa,a.nama,a.nilai,a.tgl_perolehan,a.kode_pp3, "+
					"z.kode_akun,cc.kode_param,cc.nama as nama_param,b.kode_akun as akun_bpp,"+ 	
					"case when (datediff(month,a.tgl_perolehan,'"+this.dp_d1.getDateString()+"')+1) <0 then 0 else (datediff(month,a.tgl_perolehan,'"+this.dp_d1.getDateString()+"')+1) end as umur, "+ 	
					"b.satuan,round(b.tarif*b.jumlah*b.volume,0) * a.jumlah as nilai_sat,case when b.jns_periode <> 'X' then b.jns_periode else substring(periode,5,2) end as jns_periode,"+
					"isnull(case when substring(b.jns_periode,1,1) = 'A' then round(a.jumlah*b.tarif*b.jumlah*b.volume,0) * (4 - case when datediff(month,a.tgl_perolehan,'"+this.dp_d1.getDateString()+"')+1 >= 0 then 0 else   ceiling(cast(abs(datediff(month,a.tgl_perolehan,'"+this.dp_d1.getDateString()+"')+1) as float)/3) end )"+
					"     when substring(b.jns_periode,1,1) = 'B' then round(a.jumlah*b.tarif*b.jumlah*b.volume,0) * (2 - case when datediff(month,a.tgl_perolehan,'"+this.dp_d1.getDateString()+"')+1 >= 0 then 0 else   ceiling(cast(abs(datediff(month,a.tgl_perolehan,'"+this.dp_d1.getDateString()+"')+1) as float)/6) end) "+
					"     when substring(b.jns_periode,1,1) = 'C' then round(a.jumlah*b.tarif*b.jumlah*b.volume,0) * case when datediff(month,a.tgl_perolehan,'"+this.dp_d1.getDateString()+"')+1 >= 0 then 12 else 12 + datediff(month,a.tgl_perolehan,'"+this.dp_d1.getDateString()+"')+1 end "+
					"     else round(a.jumlah*b.tarif*b.jumlah*b.volume,0) end ,0) as total, "+
					"case a.jenis_agg when 'P' then 'ESTIMASI' when 'T' then 'TAMBAH' when 'E' then 'EXIST' end as jenis_agg,cc.kode_rka as kode_rka3  "+
					"from agg_fa_asset a "+							
					"	inner join agg_fa_klpakun z on a.kode_klpakun=z.kode_klpakun "+							
					"	inner join agg_fa_klp bb on a.kode_klpfa=bb.kode_klpfa "+		
					"	inner join agg_fa_param_d b on bb.kode_klpfa=b.kode_klpfa and b.kode_lokasi ='"+this.app._lokasi+"' and b.tahun = '"+this.e_tahun.getText()+"' "+		
					"	inner join agg_fa_param_m cc on b.kode_param = cc.kode_param and b.kode_lokasi='"+this.app._lokasi+"' "+					
					"where a.status_aktif='1' and a.tahun='"+this.e_tahun.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' "+
					"order by a.no_fa";					
					
		var data2 = this.dbLib.getDataProvider(strSQL2,true);
		if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
			this.dataJU2 = data2;
			this.sgn2.setTotalPage(Math.ceil(data2.rs.rows.length/20));
			this.sgn2.rearrange();
			this.doTampilData2(1);
		} else this.sg2.clear(1);
										
		var total = 0;		
		for (var i=0;i<this.dataJU2.rs.rows.length;i++){
			line = this.dataJU2.rs.rows[i];
			total += parseFloat(line.total); 
		}		
		this.e_bpp.setText(floatToNilai(total));	
		*/	
	},
	doTampilData: function(page) {
		this.sg.clear(); 
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);		
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];										
			this.sg.appendData([line.no_fa,line.nama,floatToNilai(line.nilai),line.tgl_perolehan,line.kode_pp2,line.kode_akun,line.akun_bp,line.akun_deprs,
							    line.persen,line.umur,floatToNilai(line.nilai_susut),floatToNilai(line.akum_susut),line.sisa_umur,floatToNilai(line.susutnext),line.jenis_agg.toUpperCase(),line.periode_susut,line.kode_rka2]);
		}
		this.sg.setNoUrut(start);			
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},	
	doTampilData2: function(page) {
		this.sg2.clear(); 
		var line;
		this.page2 = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU2.rs.rows.length? this.dataJU2.rs.rows.length:start+20);
		var total = 0;		
		for (var i=start;i<finish;i++){
			line = this.dataJU2.rs.rows[i];										
			this.sg2.appendData([line.no_fa,line.nama,floatToNilai(line.nilai),line.tgl_perolehan,line.kode_pp3,line.kode_akun,line.kode_param,line.nama_param,line.akun_bpp,line.umur,
								line.satuan,floatToNilai(line.nilai_sat),line.jns_periode.toUpperCase(),floatToNilai(line.total),line.jenis_agg.toUpperCase(),line.kode_rka3]);
		}
		this.sg2.setNoUrut(start);					
	},
	doPager2: function(sender, page) {
		this.doTampilData2(page);
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
							this.clearLayar();
						}else system.info(this,result,"");
	    			break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
		if (sender == this.svrProcess){
			if (methodName == "saveData"){
				if (result.toLowerCase().search("error") == -1)					
					{
						this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (no bukti : "+ this.e_nb.getText()+")");
						this.app._mainForm.bClear.click();              
					}else system.info(this,result,"");
			}
		}
	},	
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg.clear(1); this.sg2.clear(1); 					
			setTipeButton(tbSimpan);
		} catch(e) {
			alert(e);
		}
	}
});